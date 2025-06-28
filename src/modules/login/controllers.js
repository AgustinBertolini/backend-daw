const loginService = require("./services");
const connectDB = require("../../config/db");

exports.login = async (event, context) => {
  await connectDB();
  try {
    const { email, password } = JSON.parse(event.body);
    return await loginService.login(email, password);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

exports.refreshToken = async (event, context) => {
  await connectDB();
  try {
    const headers = event.headers;
    const authHeader =
      headers && (headers.Authorization || headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { statusCode: 401, body: "Token requerido" };
    }
    const token = authHeader.split(" ")[1];
    return await loginService.refreshToken(token);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
