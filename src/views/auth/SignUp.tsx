/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../header/Header';
import * as authStyle from '@/views/auth/auth.style';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const onMemberClick = () => navigate("/auth/sign-up/member");
  const onTrainerClick = () => navigate("/auth/sign-up/trainer");

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={authStyle.containerStyle}>
        <h2 css={authStyle.titleStyle}>회원가입</h2>
        <div css={authStyle.selectionWrapperStyle}>
          <div css={authStyle.selectionStyle} onClick={onMemberClick}>
            <div css={authStyle.selectionImageStyle}></div>
            <label css={authStyle.selectionLabelStyle}>일반 회원</label>
          </div>
          <div css={authStyle.selectionStyle} onClick={onTrainerClick}>
            <div css={authStyle.selectionImageStyle}></div>
            <label css={authStyle.selectionLabelStyle}>트레이너</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;