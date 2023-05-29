const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  propertyName: {
    type: String,
    require: true,
  },
  propertyType: {
    type: String,
    require: true,
  },
  propertyCategory: {
    type: String,
    require: true,
  },
  propertyImage: {
    type: String,
    require: true,
  },
  propertyPrice: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  propertyStatus: {
    type: String,
    require: true,
    enm: ["sold", "for sell"],
    default: "for sell",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});

propertySchema.index({ location: "2dsphere" });
propertySchema.set("timestamps", true);

module.exports = mongoose.model("propertyData", propertySchema);
