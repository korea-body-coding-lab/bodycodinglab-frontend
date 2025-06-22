/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from "react";
import { buttonFindUsernameStyle, containerStyle, formLabelFindUsernameStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, getSectionStyle, inputFindUsernameWrapperStyle, inputStyle, pFindUsernameStyle } from "./auth.style";
import Header from "../header/Header";
import { findUserToResetPasswordRequest } from "@/apis/auth/find-user-to-reset-password.api";
import { GetUserInformationToResetPasswordRequestDto } from "@/dtos/auth/request/get-user-information-to-reset-password.request.dto";
import { validateGetUserInformationToResetPasswordForm } from "@/utils/get-user-informaiton-to-reset-password.valid";
import { sendResetPasswordEmailRequest } from "@/apis/auth/send-email.api";
import { SendResetPasswordEmailRequestDto } from "@/dtos/auth/request/send-reset-password-email.request.dto";

function FindUserToResetPassword() {
  const [verifyEmail, setVerifyEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    birthdate: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVarify = async(e: FormEvent) => {
    e.preventDefault();

    const { username, name, birthdate, email } = form;
    const validMessage = validateGetUserInformationToResetPasswordForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    try {
      const dto: GetUserInformationToResetPasswordRequestDto = { username, name, birthdate, email };
      const response = await findUserToResetPasswordRequest(dto);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      const { email: verifyEmail } = data;
      setVerifyEmail(verifyEmail);
      const sendEmailRequestdto: SendResetPasswordEmailRequestDto = { email: verifyEmail };
      const sendEmailResponse = await sendResetPasswordEmailRequest(sendEmailRequestdto);
      const { code: seCode, message: seMessage } = sendEmailResponse;

      if (seCode !== 'SU') {
        alert(seMessage);
        return;
      }
      setIsSendingEmail(true);

    } catch (e) {
      console.log('비밀번호 재설정(이메일 인증) 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      {!isSendingEmail && (
        <div css={containerStyle}>
          <form css={formWrapperStyle}>
            <div css={formSectionStyle}>
              <h2 css={formTitleStyle}>비밀번호 재설정</h2>
              <div css={formStyle}>
                <label css={formLabelFindUsernameStyle}>아이디</label>
                <div css={inputFindUsernameWrapperStyle}>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <div css={formStyle}>
                <label css={formLabelFindUsernameStyle}>성명</label>
                <div css={inputFindUsernameWrapperStyle}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <div css={formStyle}>
                <label css={formLabelFindUsernameStyle}>생년월일</label>
                <div css={inputFindUsernameWrapperStyle}>
                  <input
                    type="date"
                    name="birthdate"
                    value={form.birthdate}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <div css={formStyle}>
                <label css={formLabelFindUsernameStyle}>이메일</label>
                <div css={inputFindUsernameWrapperStyle}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleVarify}
                css={buttonFindUsernameStyle}
              >
                이메일 인증
              </button>
            </div>
          </form>
        </div>
      )}

      {isSendingEmail && (
        <div css={containerStyle}>
          <div css={getSectionStyle}>
            <p css={pFindUsernameStyle}>이메일이 발송되었습니다.</p>
            <p css={pFindUsernameStyle}>메일을 확인해 주세요.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default FindUserToResetPassword;
