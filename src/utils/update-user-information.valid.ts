interface FormState {
  name: string;
  address?: string;
  jobAddress?: string;
}

export const validateUpdateMemberInfoForm = (form: FormState): string | null => {
  const {
    name
  } = form;

  const nameRegex = /^[가-힣]{2,10}$/;

  if (name && !nameRegex.test(name)) {
    return "이름은 2~10자의 한글만 사용 가능합니다.";
  }
  return null;
};

export const validateUpdateTrainerInfoForm = (form: FormState): string | null => {
  const {
    name
  } = form;

  const nameRegex = /^[가-힣]{2,10}$/;

  if (name !== null && !nameRegex.test(name)) {
    return "이름은 2~10자의 한글만 사용 가능합니다.";
  }

  return null;
};