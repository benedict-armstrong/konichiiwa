import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendNotification(msg: string, subject: string) {
  let mailNotification: nodemailer.SendMailOptions = {
    from: "office@konichiiwa.com",
    to: "contact@benarmstro.ng",
    subject: subject,
    text: msg,
    html: "<p>" + msg + "</p>",
  };

  getConnection().sendMail(mailNotification, function (error, info) {
    if (error) {
      return Promise.reject(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function getConnection(): Mail {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "office@konichiiwa.com",
      pass: process.env.ZOHO_MAIL_PW,
    },
  });
}
