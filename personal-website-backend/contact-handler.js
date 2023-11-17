const { isValidRecaptcha } = require("./verify-recaptcha");
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { recaptchaResponse, email, message } = body;
  const isRecaptchaValid = await isValidRecaptcha(recaptchaResponse);
  if (!isRecaptchaValid) {
    console.log("invalid recaptcha");
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Invalid Recaptcha",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  await sendMail("New Contact Request", message, email);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Email sent successfully",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

async function sendMail(subject, data, replyTo) {
  console.log("sending mail");
  const emailParams = {
    Destination: {
      ToAddresses: [process.env.CONTACT_RECIPIENT_EMAIL],
    },
    Content: {
      Simple: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: data,
          },
        },
      },
    },
    FromEmailAddress: "contact@andys-codex.com",
    ReplyToAddresses: [replyTo],
  };

  try {
    const client = new SESv2Client({});
    const command = new SendEmailCommand(emailParams);
    console.info(await client.send(command));
  } catch (e) {
    console.error("FAILURE IN SENDING MAIL!!", e);
    throw new Error("Send email failure");
  }
  console.log("send mail completed");
  return;
}
