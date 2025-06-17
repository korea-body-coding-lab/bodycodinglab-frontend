/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import Header from '../header/Header';
import { buttonFindUsernameStyle, containerStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputFindUsernameWrapperStyle, inputStyle, formLabelFindUsernameStyle, getSectionStyle, getFindedUsernameStyle, linkStyle, linkLoginOrResetPasswordStyle, pLoginOrResetPasswordStyle, linkGroupStyle, labelFindUsernameStyle } from './auth.style';
import { Link, useNavigate } from 'react-router-dom';
import { validateFindUsernameForm } from '@/utils/find-username.valid';
import { FindUsernameRequestDto } from '@/dtos/auth/request/find-username.request.dto';
import { findUsernameRequest } from '@/apis/auth/find-username.api';

function FindUsername() {
  const [isFinding, setIsFinding] = useState(false);
  const [findedUsername, setFindedUsername] = useState('');
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e: FormEvent) => {
      e.preventDefault();
  
      const { name, birthdate, email } = form;
      const validMessage = validateFindUsernameForm(form);
      if (validMessage) {
        alert(validMessage);
        return;
      }
  
      try {
        const dto: FindUsernameRequestDto = { name, birthdate, email };
        const response = await findUsernameRequest(dto);
        const { code, message, data } = response;
  
        if (code !== 'SU' || !data) {
          alert(message);
          return;
        }
  
        const { username } = data;
        setFindedUsername(username);
        setIsFinding(true);
      } catch (e) {
      console.log('아이디 찾기 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      {!isFinding && (
        <div css={containerStyle}>
          <form css={formWrapperStyle}>
            <div css={formSectionStyle}>
              <h2 css={formTitleStyle}>아이디 찾기</h2>
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
                type='submit'
                onClick={handleSubmit}
                css={buttonFindUsernameStyle}>
                아이디 찾기
              </button>
            </div>
          </form>
        </div>
      )}

      {isFinding && (
        <div css={containerStyle}>
          <div css={getSectionStyle}>
            <label css={labelFindUsernameStyle}>회원님의 아이디는</label>
            <span css={getFindedUsernameStyle}>{findedUsername}</span>
            <span css={labelFindUsernameStyle}>입니다.</span>
            <div css={linkLoginOrResetPasswordStyle}>
                <div css={linkGroupStyle}>
                  <span css={pLoginOrResetPasswordStyle}>로그인을 시도하시겠습니까?</span>
                  <Link to="/auth/login" css={linkStyle}>로그인</Link>
                </div>
                <div css={linkGroupStyle}>
                  <span css={pLoginOrResetPasswordStyle}>비밀번호를 재설정하시겠습니까?</span>
                  <Link to="/auth/reset-password" css={linkStyle}>비밀번호 재설정</Link>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FindUsername;