import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// SIGNUP............................................................................
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashPassword = await bcryptjs.hash(password, 10);

    // create user
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await createdUser.save();

    // generate JWT
    const token = jwt.sign(
      { id: createdUser._id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // send response
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        favourites: createdUser.favourites,
        carts: createdUser.carts,
        role: createdUser.role,
      },
      token: token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN with JWT..........................................................
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // send response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        favourites: user.favourites,
        carts: user.carts,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// google login .....................................................................
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      email,
      name,
      picture,
      sub: googleId,
    } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new Google user
      user = new User({
        fullname: name,
        email,
        googleId,
        avatar: picture,
      });

      await user.save();
    } else {
      // Link Google account if it isn't already linked
      if (!user.googleId) {
        user.googleId = googleId;

        if (!user.avatar) {
          user.avatar = picture;
        }

        await user.save();
      }
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Google login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        favourites: user.favourites,
        carts: user.carts,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Google authentication failed",
    });
  }
};



// Forgot Password.....................................................
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Create reset token (valid for 15 minutes)
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const html = `
      <h2>Bookstore Password Reset</h2>

      <p>Hello ${user.fullname},</p>

      <p>You requested to reset your password.</p>

      <p>
        Click the button below to create a new password.
      </p>

      <a
        href="${resetLink}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 20px;
          text-decoration:none;
          border-radius:5px;
          display:inline-block;
        "
      >
        Reset Password
      </a>

      <p>This link will expire in <b>15 minutes</b>.</p>

      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail(
      user.email,
      "Reset Your Bookstore Password",
      html
    );

    res.status(200).json({
      message: "Password reset link sent successfully.",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Reset Password.................................................
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password reset successful.",
    });

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Reset link has expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        message: "Invalid reset link.",
      });
    }

    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
