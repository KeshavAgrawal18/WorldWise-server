const authenticationMiddleware = (req, res, next) => {
  const authorizationReceived = req.headers.authorization;
  const authenticationCode = process.env.AUTHENTICATION_CODE;
  if (authorizationReceived !== authenticationCode) {
    console.log("Unauthorized access");
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }
  // If authentication is successful, call the next middleware or route handler
  next();
};

export default authenticationMiddleware;
