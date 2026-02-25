import nodemailer from "nodemailer";

export async function enviarCorreo(control) {
  try {
    // Configuración del transporte SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Servidor SMTP
      port: 465,
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: "christianguardia@outlook.es",
        pass: `${process.env.OUTLOOK}`, // Usa contraseñas de aplicación
      },
    });

    // Datos del correo
    let info = await transporter.sendMail({
      from: '"CRCV Panamá" <christianguardia@outlook.es>',
      to: "christianguardia0@gmail.com",
      subject: "Prueba de envío",
      text: `${control}`,
      html: `<div class="foot-rights">
				<p>Copyright © <span class="date"></span> <a href="https://www.instagram.com/crcvpanama/" target="_blank"><strong> Centro de Rehabilitación de la Columna Vertebral</strong></a> </p>
			</div>`,
    });

    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}
