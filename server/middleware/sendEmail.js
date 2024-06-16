import nodeMailer from "nodemailer"

export const sendEmail = async(options)=>{
    var transport = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ca3e2d15b508b9",
          pass: "033f62452cead2"
        }
      });

    const mailOptions = {
        from:"Kunal",
        to: options.email,
        subject: options.subject,
        text : options.message,
    }

    await transport.sendMail(mailOptions)
}