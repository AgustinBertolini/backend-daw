const nodemailer = require("nodemailer");

// Configuración básica, reemplaza con tus datos reales
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soporte.mercado.clone@gmail.com",
    pass: "soportemercadoclone",
  },
});

async function sendCompraConfirmation(to, compra) {
  try {
    await transporter.verify();
    console.log("Conexión con el servidor de correo exitosa");
  } catch (error) {
    console.error("Error al conectar con el servidor de correo:", error);
    throw new Error("No se pudo conectar con el servidor de correo");
  }
  const mailOptions = {
    from: "soporte.mercado.clone@gmail.com",
    to,
    subject: "Confirmación de compra",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f6fa; padding: 32px;">
        <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="background: #ffe600; padding: 24px 0; text-align: center;">
            <img src='https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.5.1/mercadolibre/logo__large_plus.png' alt='Logo' style='height: 40px;'/>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #333; margin-bottom: 12px;">¡Gracias por tu compra!</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 24px;">Tu compra fue registrada exitosamente. Aquí tienes los detalles:</p>
            <div style="background: #f7f7f7; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0; color: #333;"><strong>ID de compra:</strong> ${compra._id}</p>
              <p style="margin: 0; color: #333;"><strong>Total:</strong> $${compra.total}</p>
            </div>
            <a href="https://main.d25qt8tyxax8iu.amplifyapp.com/" style="display: inline-block; background: #3483fa; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">Ver más productos</a>
            <p style="color: #999; font-size: 13px; margin-top: 32px;">Si tienes dudas, responde este correo o visita nuestro centro de ayuda.</p>
          </div>
        </div>
      </div>
    `,
  };

  const sender = await transporter.sendMail(mailOptions);

  console.log("Sender", sender);
}

module.exports = { sendCompraConfirmation };
