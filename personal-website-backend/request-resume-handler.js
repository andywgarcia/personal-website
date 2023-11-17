const { isValidRecaptcha } = require("./verify-recaptcha");
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
const fs = require("node:fs");

const SOURCE_EMAIL = "no-reply@andys-codex.com";
const SUBJECT = "Your Request for Andy's Resume";

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { recaptchaResponse, fullName, email, phoneNumber, company, message } =
    body;
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

  await sendResume(fullName, email, phoneNumber, company, message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Resume sent successfully",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

async function sendResume(fullName, email, phoneNumber, company, message) {
  console.log("sending resume");
  const emailParams = {
    Destination: {
      ToAddresses: [email],
      BccAddresses: [process.env.CONTACT_RECIPIENT_EMAIL],
    },
    Content: {
      Raw: {
        Data: buildRawEmailContent(
          fullName,
          email,
          phoneNumber,
          company,
          message,
        ),
      },
    },
    FromEmailAddress: "no-reply@andys-codex.com",
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

function buildRawEmailContent(fullName, email, phoneNumber, company, message) {
  console.log(
    "Building raw email content",
    fullName,
    email,
    phoneNumber,
    company,
    message,
  );
  const resumePdf = fs.readFileSync("./resume.pdf");
  var rawContent =
    "From: 'AWS SES Attachment Configuration' <" + SOURCE_EMAIL + ">\n";
  rawContent += "To: " + email + "\n";
  rawContent += "Bcc: " + process.env.CONTACT_RECIPIENT_EMAIL + "\n";
  rawContent += `Subject: ${SUBJECT}\n`;
  rawContent += "MIME-Version: 1.0\n";
  rawContent += 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  rawContent += "--NextPart\n";
  rawContent += "Content-Type: text/html\n\n";
  rawContent += `
    <html>
      <head></head>
      <body>
      <p>Hello ${fullName},</p>
      <br />
      <p>Thank you for reaching out.</p>
      <p>My resume is attached and I'll be getting in touch with you shortly.</p>
      <br />
      <p>I am looking forward to connecting with you!</p>
      <br />
      <p>Andy Garcia</p>
      <hr />
      <br />
      <p>Your Submission:</p>
      <p>Full Name: ${fullName}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phoneNumber}</p>
      <p>Company: ${company}</p>
      <p>Message: ${message}</p>
      <br />
      <hr />
      <br />
      </body>
    </html>
  `;
  rawContent += "\n\n";
  rawContent += "--NextPart\n";
  rawContent +=
    'Content-Type: application/octet-stream; name="resume-andy-garcia.pdf"\n';
  rawContent += "Content-Transfer-Encoding: base64\n";
  rawContent += "Content-Disposition: attachment\n\n";
  rawContent +=
    resumePdf.toString("base64").replace(/([^\0]{76})/g, "$1\n") + "\n\n";
  rawContent += "--NextPart--";
  console.log("rawContent", rawContent);
  return Buffer.from(rawContent);
}
