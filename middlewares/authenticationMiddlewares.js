const authenticationMiddleware = (req, res, next) => {
  console.log("Middleware called");
  const authorizationReceived = req.headers.authorization;
  console.log(authorizationReceived);
  const authenticationCode = process.env.AUTHENTICATION_CODE;

  if (authorizationReceived !== authenticationCode) {
    console.log("Unauthorized access");
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // If authentication is successful, call the next middleware or route handler
  console.log("Authorization Succesful");
  next();
};

export default authenticationMiddleware;
