/**
 * 이메일 형식을 정규식으로 검사합니다.
 * @param {string} email 사용자의 이메일입니다.
 * @returns {boolean} 이메일 유효성 검사 결과를 반환합니다.
 */
function emailValidate(email) {
  const emailRule =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRule.test(email);
}

/**
 * 비밀번호 형식을 검사합니다. (영문+숫자+8자리이상)
 * @param {string} type 로그인인지 회원가입인지 구분하기 위한 type입니다.
 * @param {string|object} passwordInfo type이 register가 아니라면 string입니다.
 * @returns {boolean} 비밀번호 유효성 검사 결과를 반환합니다.
 */
function passwordValidate(type, passwordInfo) {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (type !== "register") return passwordRule.test(passwordInfo);

  const { password, confirmPassword } = passwordInfo;
  const isSamePassword = password === confirmPassword;
  const isPassRule =
    passwordRule.test(password) && passwordRule.test(confirmPassword);

  return isPassRule && isSamePassword;
}

/**
 * 회원가입 시 입력한 정보를 각 유효성 검사 함수로 전달합니다.
 * @param {string} type 로그인인지 회원가입인지 구분하기 위한 type입니다.
 * @param {object} info 유효성 검사를 진행 할 formData입니다.
 * @returns {boolean} 회원가입 formData 유효성 검사 결과를 반환합니다.
 */
function registerValidation(type, info) {
  const { email, password, confirmPassword, nickname } = info;

  return (
    emailValidate(email) &&
    passwordValidate(type, { password, confirmPassword }) &&
    nickname.length >= 2
  );
}

/**
 * 로그인 시 입력한 정보를 각 유효성 검사 함수로 전달합니다.
 * @param {string} type 로그인인지 회원가입인지 구분하기 위한 type입니다.
 * @param {object} info 유효성 검사를 진행 할 formData입니다.
 * @returns {boolean} 로그인 formData 유효성 검사 결과를 반환합니다.
 */
function loginValidation(type, info) {
  const { email, password } = info;
  return emailValidate(email) && passwordValidate(type, password);
}

/**
 * 로그인 및 회원가입 시 type에 따라 formData 유효성 검사를 진행합니다.
 * @param {string} type 로그인인지 회원가입인지 구분하기 위한 type입니다.
 * @param {object} info 유효성 검사를 진행 할 formData입니다.
 * @returns {boolean} 유효성 검사 완료 boolean을 반환합니다.
 */
export const validation = (type, info) => {
  if (type === "register") return registerValidation(type, info);
  return loginValidation(type, info);
};
