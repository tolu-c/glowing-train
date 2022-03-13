const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const nodeMailgun = require("nodemailer-mailgun-transport");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// step 1
const mailgunAuth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: "officialrectification.com",
  },
};

// step 2
// let transporter = nodemailer.createTransport(nodeMailgun(mailgunAuth));

// step 3
// const mailOptions = {
//   from: process.env.MAIL_FROM,
//   to: "toluadeyemo7@gmail.com",
//   subject: "TEST EMAIL",
//   html: `<h4>Here is your mail</h4>
//         <p>${text}</p>`,
// };

app.post("/send-mail", cors(), async (req, res) => {
  let { text } = req.body;
  const transport = nodemailer.createTransport(nodeMailgun(mailgunAuth));

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: "toluadeyemo7@gmail.com",
    subject: "TEST EMAIL",
    html: `<h4>Here is your mail</h4>
        <p>${text}</p>`,
  };

  await transport.sendMail(mailOptions, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is listening on port 4000, ${process.env.API_KEY}`);
});
