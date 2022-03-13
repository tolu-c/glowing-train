const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const mailgunAuth = {
//   auth: {
//     api_key: "key-12341234123412341234",
//     domain:
//       "One of your domain names listed at your https://mailgun.com/app/domains",
//   },
// };

app.post('/send-mail', cors(), async (req, res) => {
    let {text} = req.body
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            password: process.env.MAIL_PASSWORD
        }
    })

    await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: 'toluadeyemo7@gmail.com',
        subject: 'TEST EMAIL',
        html: `<h4>Here is your mail</h4>
        <p>${text}</p>`
    })
})

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is listening on port 4000, ${process.env.MAIL_PASSWORD}`);
});
