const loginService = require("./services");
const connectDB = require("../../config/db");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

exports.login = async (event, context) => {
  await connectDB();
  try {
    const { email, password } = JSON.parse(event.body);
    const result = await loginService.login(email, password);
    return { ...result, headers: corsHeaders };
  } catch (err) {
    return { statusCode: 500, body: err.message, headers: corsHeaders };
  }
};

exports.refreshToken = async (event, context) => {
  await connectDB();
  try {
    const headers = event.headers;
    const authHeader =
      headers && (headers.Authorization || headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { statusCode: 401, body: "Token requerido", headers: corsHeaders };
    }
    const token = authHeader.split(" ")[1];
    const result = await loginService.refreshToken(token);
    return { ...result, headers: corsHeaders };
  } catch (err) {
    return { statusCode: 500, body: err.message, headers: corsHeaders };
  }
};
