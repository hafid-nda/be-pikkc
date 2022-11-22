module.exports = {
  onLost(req, res) {
    res.status(200).json({
      status: "Success",
      message: "Hello World!",
    });
  },
  
  onError(err, req, res, next) {
    res.status(500).json({
      status: "ERROR",  
      error: {
        name: err.name,
        message: err.message,
      },
    });
  },
};
