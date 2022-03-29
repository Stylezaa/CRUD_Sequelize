module.exports.isAdmin = (req, res, next) => {
  const { role_name } = req.user;

  if (role_name === 'admin') {
    next();
  } else {
    return res.status(403).json({
      error: {
        message: 'You do not have permission to access this page.',
      },
    });
  }
};
