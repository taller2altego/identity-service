const nodemailer = require('nodemailer');
const logger = require('../../winston');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'news.altego@gmail.com',
    pass: 'ebwoehnepqfptpqk'
  }
});

const sendMail = (dstEmail, token) => {
  const mensaje = `Ingrese el siguiente Token en la App para recuperar su contraseña ${token}`;
  const mailOptions = {
    from: 'news.altego@gmail.com',
    to: dstEmail,
    subject: 'FIUBER - Recover Password',
    text: mensaje
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(JSON.stringify(error, undefined, 2));
    } else {
      logger.info(`Email enviado: ${info.response}`);
    }
  });
};

module.exports = { sendMail };
