const registerService = require("./services");
const connectDB = require("../../config/db");

exports.register = async (event, context) => {
  await connectDB();
  try {
    const data = JSON.parse(event.body);
    console.log("llego esto", event.body);
    return await registerService.register(data);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
