require('dotenv').config();
const express=require('express');
const app = express();
const port=process.env.PORT || 7070;
//const nodemailer = require("nodemailer");


app.set((__dirname));
app.set('view engine','hbs');
//app.use('/uploads', express.static('uploads'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.json());//שכבת ביניים שבונה בודי לבקשות בפורמט גייסון
//app.use(express.urlencoded({extended:true}));//שכבת ביניים בפורמט יוראל מקודד

app.post('/contact',(req,res)=>{
    const subject=req.body.subject;//שמירת נושא המייל שנשלח
    const name=req.body.name;
    const mail=req.body.mail;
    const tel=req.body.tel;
    const message=req.body.message;
    const content=name+"<br>"+ mail +"<br>" + tel + "<br>" + message;//שמירת תןכן המייל
    const to=mail;//שמירת כתובת הנעמן אליו יש לשלוח את המייל
    //const from=process.env.GMAIL_USER;
    const htmlContent='<h1>' + content + '</h1>' + '<br><img src="cid:image1" width="400" height="300" />';
    const attachments=[
      {
        filename: 'data.txt',
        content: 'Hello Yaron🤗',
      },
      {
        filename: 'orque.png',
        path: './orque.png',
        cid: 'image1'
      }
    ]
    require('./mailer').SendMail(to,subject,content,htmlContent,attachments);
    return res.status(200).json(true)
    //יצירת אובייקט שרת דואר אלקטרוני-SMTP
    //let transporter = nodemailer.createTransport({
    //host:process.env.SMTP_SERVER,
    //port:587,
    //secure: false, 
    //auth: {
        //user:from,
        //pass:process.env.GMAIL_PASS,
    //}

    //});
    //יצרנו אובייקט של מייל לשליחה
    //const msgObj = {
        //from:from,
        //to:to,
        //subject:subject,
        //text:content,
        //html:'<h1>' + content + '</h1>' + '<br><img src="cid:image1" width="400" height="300" />',
        //attachments: [
          //{
            //filename: 'data.txt',
            //content: 'Hello Yaron🤗',
          //},
          //{
            //filename: 'orque.png',
            //path: './orque.png',
            //cid: 'image1'
          //}
        //]
      //}
      //transporter.sendMail(msgObj).then((data)=>{
        //return res.status(200).json({response:true})
      //}).catch((err)=>{
        //return res.status(500).json({response:err})
      //});
});

app.get('/email',(req,res)=>{
  res.render('email');
})
app.listen(port,()=>{
    console.log('server is Up')
});