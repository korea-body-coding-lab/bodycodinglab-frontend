interface FormState {
  newPassword: string;
  confirmPassword: string;
}

export const validateResetPasswordForm = (form: FormState): string | null => {
  const {
    newPassword,
    confirmPassword,
  } = form;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!newPassword || !passwordRegex.test(newPassword)) {
    return "비밀번호는 영문/숫자/특수문자를 포함한 최소 8자 이상이어야 합니다.";
  }

  if (newPassword !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return null;
};