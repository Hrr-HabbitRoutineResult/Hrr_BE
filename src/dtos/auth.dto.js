const registerDto = body => {
  const email = body.email;
  const phone_number = body.phoneNumber;
  const name = body.name;
  const password = body.password;
  const verification_code = body.verificationCode;
  return { email, phone_number, name, password, verification_code };
};

const emailVerificationCodeDto = body => {
  const verification_code = body.verificationCode;
  const email = body.email;
  return { verification_code, email };
};

// generateTokensDto = (tokens) => {
//   const a
// }

export default {
  registerDto,
  emailVerificationCodeDto,
};
