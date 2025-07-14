const { sendCompraConfirmation } = require("./src/utils/email");

(async () => {
  try {
    await sendCompraConfirmation("agustinbertolini0@gmail.com", {
      _id: "TEST123456",
      total: 1999.99,
    });
    console.log("Correo de prueba enviado correctamente.");
  } catch (err) {
    console.error("Error enviando el correo de prueba:", err);
  }
})();
