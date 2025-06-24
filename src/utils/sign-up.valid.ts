interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthdate: string;
  gender: string;
  phone: string;
  email: string;
  memberAddress?: string;
  jobAddress?: string;
}

export const validateMemberForm = (form: FormState): string | null => {
  const {
    username,
    password,
    confirmPassword,
    name,
    birthdate,
    gender,
    phone,
    email,
    memberAddress
  } = form;

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,12}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[가-힣]{2,10}$/;
  const phoneRegex = /^(01[0-9]{1})-([0-9]{3,4})-([0-9]{4})$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  
  if (!username || !usernameRegex.test(username)) {
    return "아이디는 5~12자의 영문/숫자만 사용 가능하며, 영문으로 시작하여야 합니다.";
  }

  
  if (!password || !passwordRegex.test(password)) {
    return "비밀번호는 영문/숫자/특수문자를 포함한 최소 8자 이상이어야 합니다.";
  }

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  if (!name || !nameRegex.test(name)) {
    return "이름은 2~10자의 한글만 사용 가능합니다.";
  }

  if (!birthdate) {
    return "생년월일은 YYYY-MM-DD 형식이여야 합니다.";
  }

  if (!gender) {
    return "성별을 선택해주세요.";
  }

  if (!phone || !phoneRegex.test(phone)) {
    return "휴대폰 번호는 000-0000-0000 형식이어야 합니다.";
  }

  if (!email || !emailRegex.test(email)) {
    return "이메일은 abc@example.com 형식이어야 합니다.";
  }

  if (!memberAddress) {
    return "주소는 필수 항목입니다.";
  }

  return null;
};

export const validateTrainerForm = (form: FormState): string | null => {
  const {
    username,
    password,
    confirmPassword,
    name,
    birthdate,
    gender,
    phone,
    email,
    jobAddress
  } = form;

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,12}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[가-힣]{2,10}$/;
  const phoneRegex = /^(01[0-9]{1})-([0-9]{3,4})-([0-9]{4})$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  
  if (!username || !usernameRegex.test(username)) {
    return "아이디는 5~12자의 영문/숫자만 사용 가능하며, 영문으로 시작하여야 합니다.";
  }

  
  if (!password || !passwordRegex.test(password)) {
    return "비밀번호는 영문/숫자/특수문자를 포함한 최소 8자 이상이어야 합니다.";
  }

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  if (!name || !nameRegex.test(name)) {
    return "이름은 2~10자의 한글만 사용 가능합니다.";
  }

  if (!birthdate) {
    return "생년월일은 YYYY-MM-DD 형식이여야 합니다.";
  }

  if (!gender) {
    return "성별을 선택해주세요.";
  }

  if (!phone || !phoneRegex.test(phone)) {
    return "휴대폰 번호는 000-0000-0000 형식이어야 합니다.";
  }

  if (!email || !emailRegex.test(email)) {
    return "이메일은 abc@example.com 형식이어야 합니다.";
  }

  if (!jobAddress) {
    return "근무지 주소는 필수 항목입니다.";
  }

  return null;
};