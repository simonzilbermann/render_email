const nodemailer = require("nodemailer");

module.exports.SendMail=function(to,subject,MsgText,MsgHtml,attachments){   
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_SERVER,
        port:587,//25 465
        secure: false, 
        auth: {
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS,
        }
    });
    const msgObj = {
        from:process.env.GMAIL_USER,
        to:to,
        subject:subject,
        text:MsgText,
        html:MsgHtml,
        attachments:attachments 
      };
       transporter.sendMail(msgObj,function(err,data){
        if(err)
        {
          console.log(err.message)
        }
        else
        {
          console.log('Email sent successfully')
        }
      });
       
}