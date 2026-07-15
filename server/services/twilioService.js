import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export const twilioClient = client;

export const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    from: process.env.TWILIO_NUMBER,
    to,
  });
};

// export const makeCall = (to, url) => {
//   return client.calls.create({
//     url,
//     from: process.env.TWILIO_NUMBER,
//     to,
//   });
// };

export const makeCall = (to, twimlOrUrl) => {
  const callConfig = {
    from: process.env.TWILIO_NUMBER,
    to,
  }

  if (twimlOrUrl.startsWith("http")) {
    callConfig.url = twimlOrUrl;
  } else {
    callConfig.twiml = twimlOrUrl
  }
  return client.calls.create(callConfig)
}
