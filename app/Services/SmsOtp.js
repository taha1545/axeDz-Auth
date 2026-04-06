module.exports = {
  async send(phone, otp) {
    // Replace this with your real SMS provider integration.
    console.log(`SMS OTP to ${phone}: ${otp}`);
    return true;
  },
};
