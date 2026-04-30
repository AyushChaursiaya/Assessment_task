// middleware/isAuth.js
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Token not found. Please login." 
      });
    }
    
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken || !decodeToken.userId) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token. Please login again." 
      });
    }
    
    req.userId = decodeToken.userId;
    req.user = { 
      _id: decodeToken.userId,
      id: decodeToken.userId 
    };
    
    next(); 
    
  } catch (error) {
    console.error("isAuth Error:", error.message);    
    return res.status(500).json({ 
      success: false,
      message: "Authentication error." 
    });
  }
};

module.exports = isAuth;