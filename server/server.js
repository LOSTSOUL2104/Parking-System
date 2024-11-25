const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const {
  authenticateToken,
  validateRequestBody,
} = require("./middleware/middleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let totalBalance = 100.0;
let availableBalance = 75.0;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String },
});

const Users = mongoose.model("Users", userSchema);

const parkingSpaceSchema = new mongoose.Schema({
  section: { type: Number, required: true },
  spot: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["occupied", "reserved"], default: "reserved" },
});

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);

app.get("/api/balance", (req, res) => {
  res.json({ totalBalance, availableBalance });
});

app.post("/api/add-funds", validateRequestBody(["amount"]), (req, res) => {
  const { amount } = req.body;
  if (amount > 0) {
    totalBalance += amount;
    availableBalance += amount;
    res.json({ totalBalance, availableBalance });
  } else {
    res.status(400).json({ error: "Invalid amount" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: "Incorrect email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        errors: "Incorrect email or password.",
      });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: "Email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name: username,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

app.post(
  "/api/reserve-parking",
  authenticateToken,
  validateRequestBody(["section", "spot", "userId"]),
  async (req, res) => {
    try {
      const { section, spot, userId } = req.body;

      const existingReservation = await ParkingSpace.findOne({
        section,
        spot,
        status: "occupied",
      });

      if (existingReservation) {
        return res.status(400).json({
          success: false,
          message: "This parking spot is already occupied.",
        });
      }

      const parkingReservation = new ParkingSpace({
        section,
        spot,
        userId,
        status: "reserved",
      });

      await parkingReservation.save();

      res.json({
        success: true,
        message: `Parking spot ${spot} in section ${
          section + 1
        } reserved successfully!`,
        reservation: parkingReservation,
      });
    } catch (error) {
      console.error("Parking reservation error:", error);
      res.status(500).json({
        success: false,
        message: "Error reserving parking spot",
      });
    }
  }
);

app.listen(PORT, (error) => {
  if (!error) console.log(`Server running on port ${PORT}`);
  else console.log("Error:", error);
});
