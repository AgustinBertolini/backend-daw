const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@daw.fxkv3dl.mongodb.net/DAW?retryWrites=true&w=majority&appName=DAW";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      return await mongoose.connect(uri, {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
      });
    }
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
