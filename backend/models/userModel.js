import mongoose from 'mongoose';
import crypto from 'crypto';
// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    passwordHistory: {
      type: [String],
      default: []
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    iv: {
      type: String,
      required: true, // Storing the initialization vector for decryption
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

userSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = token;
  return token;
};


// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
