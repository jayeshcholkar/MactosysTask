const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
  userState: {
    type: String,
    require: true,
  },
  userCity: {
    type: String,
    require: true,
  },
  userAddress: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    enum: ["seller", "buyer"],
    require: true,
    default: "buyer",
  },
  userPhone: {
    type: Number,
    require: true,
  },
  profilePic: {
    type: String,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("userData", userSchema);
