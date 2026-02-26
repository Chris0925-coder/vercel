import nodemailer from "nodemailer";

export async function enviarCorreo(name, email, phone, control, date) {
  try {
    // Configuración del transporte SMTP
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com", // Servidor SMTP
      port: 465,
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Usa contraseñas de aplicación
      },
    });

    // Datos del correo
    let info = await transporter.sendMail({
      from: '"WEB API CRCVPanamá" <crcvpanama.org>',
      to: "crcvpanama@outlook.es",
      subject: `${name} | Formulario Web`,
      text: `${control}`,
      html: `<h2>New Submission Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Client-Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> <a href="https://wa.me/${phone}">${phone}</a></p>
      <p><strong>Message:</strong> ${control}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Form:</strong> <a href="https://crcvpanama.org/pages/contacto">Ir a la web <img src="https://www.crcvpanama.org/favicons/favicon.png" width=40 height=40 alt="logo"></a></p>`,
    });

    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}
