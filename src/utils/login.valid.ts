interface FormState {
  username: string;
  password: string;
}

export const validateLoginForm = (form: FormState): string | null => {
  const {
    username,
    password
  } = form;
  
  if (!username) {
    return "아이디는 필수 항목입니다.";
  }

  
  if (!password) {
    return "비밀번호는 필수 항목 입니다.";
  }

  return null;
};