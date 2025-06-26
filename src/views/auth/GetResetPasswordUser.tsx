/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from "react";
import { buttonFindUsernameStyle, containerStyle, formLabelFindUsernameStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, fullPageLoaderStyle, getSectionStyle, inputFindUsernameWrapperStyle, inputStyle, pFindUsernameStyle } from "./auth.style";
import Header from "../header/Header";
import { getResetPasswordUserRequeset } from "@/apis/auth/get-reset-password-user.api";
import { GetResetPasswordUserRequestDto } from "@/dtos/auth/request/get-reset-password-user.request.dto";
import { validateGetUserInformationToResetPasswordForm } from "@/utils/get-user-informaiton-to-reset-password.valid";
import { sendResetPasswordEmailRequest } from "@/apis/auth/send-reset-password-email.api";
import { SendResetPasswordEmailRequestDto } from "@/dtos/auth/request/send-reset-password-email.request.dto";

function GetResetPasswordUser() {
  const [verifyEmail, setVerifyEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    const { username, name, birthdate, email } = form;
    const validMessage = validateGetUserInformationToResetPasswordForm(form);
    if (validMessage) {
      alert(validMessage);
      setIsLoading(false);
      return;
    }

    try {
      const dto: GetResetPasswordUserRequestDto = { username, name, birthdate, email };
      const response = await getResetPasswordUserRequeset(dto);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div css={fullPageLoaderStyle}>
          로딩 중입니다...
        </div>
      )}
      <div>
        <Header />
      </div>
      {!isSendingEmail && (
        <div css={containerStyle}>
          <form onSubmit={handleVarify} css={formWrapperStyle}>
            <div css={formSectionStyle}>
              <h2 css={formTitleStyle}>비밀번호 재설정</h2>
              <div css={formStyle}>
                <label css={formLabelFindUsernameStyle}>아이디</label>
                <div css={inputFindUsernameWrapperStyle}>
                  <input
                    type='text'
                    name='username'
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
                    type='text'
                    name='name'
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
                    type='date'
                    name='birthdate'
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
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <button
                type='submit'
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

export default GetResetPasswordUser;
