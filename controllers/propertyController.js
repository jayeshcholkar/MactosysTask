const propertySchema = require("../models/propertySchema");
var geoip = require("geoip-lite");

const addProperty = async (req, res) => {
  const propertyData = new propertySchema(req.body);
  try {
    var ip = "207.97.227.239";
    var geo = geoip.lookup(ip);
    console.log(geo.range);
    if (req.user.userRole === "seller") {
      if (propertyData !== null) {
        if (req.file !== undefined) {
          propertyData.propertyImage = req.file.path;
        }
        propertyData.sellerId = req.user._id;
        propertyData.location = geo.range;
        propertyData.save();
        res.status(201).json({
          success: true,
          message: "property added successfully",
          product: propertyData,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const propertyList = async (req, res) => {
  try {
    let { user, query } = req;
    const { property, search, filter, sort, page } = query;
    const role = user.userRole;
    let where;
    let perPage = 5;
    let sorting = {
      propertyPrice: sort,
      createdAt: sort,
    };
    where = {
      $or: [
        { propertyName: { $regex: search, $options: "i" } },
        { location: { $regex: filter, $options: "i" } },
        { propertyCategory: { $regex: filter, $options: "i" } },
      ],
    };
    if (property == "myproperty" && role == "seller") {
      where = {
        sellerId: user._id,
      };
    }
    console.log(where);
    const propertyData = await propertySchema
      .find(where || null)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sorting);
    if (propertyData[0] !== undefined) {
      res.status(200).json({
        success: true,
        message: "Property fetched succesfully",
        products: propertyData,
        result: propertyData.length,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Property not available",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await propertySchema.findById(req.params.id);
    if (property) {
      if (
        req.user.userRole === "seller" &&
        req.user._id === property.sellerId.toString()
      ) {
        await propertySchema.findByIdAndDelete(req.params.id);
        res.status(202).json({
          success: false,
          message: "Property deleted successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await propertySchema.findById(req.params.id);
    if (property) {
      if (
        req.user.userRole === "seller" &&
        req.user._id === property.sellerId.toString()
      ) {
        const updated = await propertySchema.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(202).json({
          success: false,
          message: "Property updated successfully",
          product: updated,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = {
  addProperty,
  propertyList,
  deleteProperty,
  updateProperty,
};
