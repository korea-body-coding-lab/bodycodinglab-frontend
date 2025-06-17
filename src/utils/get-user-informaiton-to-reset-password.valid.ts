interface FormState {
  username: string,
  name: string;
  birthdate: string;
  email: string;
}

export const validateGetUserInformationToResetPasswordForm = (form: FormState): string | null => {
  const {
    username,
    name,
    birthdate,
    email
  } = form;

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,12}$/;
  const nameRegex = /^[가-힣]{2,10}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

  if (!username || !usernameRegex.test(username)) {
    return "아이디는 5~12자의 영문/숫자만 사용 가능하며, 영문으로 시작하여야 합니다.";
  }
  
  if (!name || !nameRegex.test(name)) {
    return "이름은 2~10자의 한글만 사용 가능합니다.";
  }

  if (!birthdate) {
    return "생년월일은 필수 항목 입니다.";
  }

  if (!email || !emailRegex.test(email)) {
    return "이메일은 abc@example.com 형식이어야 합니다.";
  }

  return null;
};