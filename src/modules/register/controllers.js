const registerService = require("./services");
const connectDB = require("../../config/db");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

exports.register = async (event, context) => {
  await connectDB();
  try {
    const data = JSON.parse(event.body);
    console.log("llego esto", event.body);
    const result = await registerService.register(data);
    return { ...result, headers: corsHeaders };
  } catch (err) {
    return { statusCode: 500, body: err.message, headers: corsHeaders };
  }
};
