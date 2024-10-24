import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    from: process.env.TWILIO_NUMBER,
    to,
  });
};

export const makeCall = (to, url) => {
  return client.calls.create({
    url,
    from: process.env.TWILIO_NUMBER,
    to,
  });
};
