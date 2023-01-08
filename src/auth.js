// Using twilio's sms API to verify users using One Time Password.
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

async function sendSms(userNumber, otp){
    try {
        client.messages
        .create({
            body: `Your OTP to login/register with Health Plus is ${otp}. It will be valid for 10 minutes.\n\n Team Health Plus.`,
            from: twilioNumber,
            to: userNumber
        })
        .then(message => console.log("Message sent!"));
    } catch(err) {
        console.error(err);
    }
}

module.exports = sendSms;