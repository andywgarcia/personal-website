module.exports.isValidRecaptcha = async (recaptchaResponse) => {
  console.log("checking recaptcha");
  if (!recaptchaResponse) {
    console.error("recaptcha is missing");
    return false;
  }
  const body = {
    secret: process.env.GOOGLE_RECAPTCHA_SECRET,
    response: recaptchaResponse,
  };
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: createFormBody(body),
    },
  );
  console.log("recaptcha site verify request completed. Checking response");
  if (!response.ok) {
    console.error(response);
    throw new Error("Unexpected Error");
  }
  const parsedResponse = await response.json();
  if (parsedResponse["error-codes"]) {
    console.error(JSON.stringify(parsedResponse["error-codes"]));
  }
  console.log("recaptcha result", parsedResponse.success);
  return parsedResponse.success;
};

const createFormBody = (details) => {
  return Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]),
    )
    .join("&");
};
