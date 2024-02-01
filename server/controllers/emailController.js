import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

const emailController = {
  sendEmail: asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other port
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    //send mail with defined transport object
    let information = await transporter.sendMail({
      from: '"Hey " <bboyfingersl@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // subject line
      text: data.text, // plain text body
      html: data.html
    });

    return information;
  })
};

export default emailController;
