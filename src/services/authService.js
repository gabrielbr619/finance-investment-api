// src/services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(email, password) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return this.generateToken(user);
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, isPremium: user.isPremium },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = AuthService;
