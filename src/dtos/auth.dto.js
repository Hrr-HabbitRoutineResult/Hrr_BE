const registerDto = body => {
  const email = body.email;
  const password = body.password;
  const verification_id = body.verificationId;
  return { email, password, verification_id };
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
