const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "news.altego@gmail.com",
      pass: "ebwoehnepqfptpqk",
    },
  });

const sendMail = (dstEmail) => {
    var mensaje = "luchito...";
    var mailOptions = {
        from: 'news.altego@gmail.com',
        to: dstEmail,
        subject: 'FIUBER - Recover Password',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports = { sendMail };