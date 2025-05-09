import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z\s]+$/.test(value);
      },
      message: "Full name must contain only alphabets and spaces",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password confirmation does not match password",
    },
  },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.passwordConfirm = undefined; // Remove passwordConfirm after validation
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
