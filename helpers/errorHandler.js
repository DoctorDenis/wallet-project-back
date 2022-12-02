const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};

const ResponseError = (code, message = messages[code]) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

module.exports = ResponseError;
