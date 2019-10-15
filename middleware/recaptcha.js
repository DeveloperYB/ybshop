const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG
const { RecaptchaV2 } = require('express-recaptcha');
const recaptcha = new RecaptchaV2( process.env.RECAPCHA_SITE_KEY, process.env.RECAPCHA_SECRET_KEY );

module.exports = recaptcha;
