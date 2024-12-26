const roleMiddleware = (...authRoles) => {
  return (req, res, next) => {
    const roleIndex = authRoles.indexOf(req.user.role);
    if (roleIndex === -1) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = roleMiddleware;
