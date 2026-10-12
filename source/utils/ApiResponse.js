const ApiResponse = ({
  res,
  statusCode = 200,
  message = "Success",
  data = null,
  meta = null,
}) => {
  const response = {
    success: true,
    statusCode,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

export default ApiResponse;