interface FormState {
  jobAddress?: string;
}

export const validateReapplyTrainerForm = (form: FormState): string | null => {
  const {
    jobAddress
  } = form;

  if (!jobAddress) {
    return "근무지 주소는 필수 항목입니다.";
  }

  return null;
};