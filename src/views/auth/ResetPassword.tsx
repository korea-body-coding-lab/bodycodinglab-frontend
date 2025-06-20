/** @jsxImportSource @emotion/react */
import React, { FormEvent, useEffect, useState } from 'react'
import { buttonResetPasswordStyle, containerStyle, formLabelResetPasswordStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputFindUsernameWrapperStyle, inputStyle } from './auth.style';
import Header from '../header/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateResetPasswordForm } from '@/utils/reset-password.valid';
import { ResetPasswordRequestDto } from '@/dtos/auth/request/reset-password.request.dto';
import { resetPasswordRequest } from '@/apis/auth/reset-password.api';
import { VerifyEmailRequest } from '@/apis/auth/verify-email.api';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
      newPassword: "",
      confirmPassword: "",
  });

  const token = searchParams.get('token');

  if (!token) {
    alert('잘못된 토큰입니다.');
    return;
  }

  useEffect(() =>{
      verifyEmail();
    }, [token]);

  const verifyEmail = async() => {
    try {
      const response = await VerifyEmailRequest(token);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }
      console.log('이메일 인증 성공: ' + message);

    } catch (e) {
      console.log('이메일 인증 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = async(e: FormEvent) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = form;
    const validMessage = validateResetPasswordForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    try {
      const dto: ResetPasswordRequestDto = { newPassword, confirmPassword };
      const response = await resetPasswordRequest(token, dto);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('비밀번호 재설정이 완료되었습니다.');
      navigate('/auth/login');
    } catch (e) {
      console.log('비밀번호 재설정 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }

  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <form css={formWrapperStyle}>
          <div css={formSectionStyle}>
            <h2 css={formTitleStyle}>비밀번호 재설정</h2>
            <div css={formStyle}>
              <label css={formLabelResetPasswordStyle}>비밀번호</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formStyle}>
              <label css={formLabelResetPasswordStyle}>비밀번호 확인</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleReset}
              css={buttonResetPasswordStyle}
            >
              재설정
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;