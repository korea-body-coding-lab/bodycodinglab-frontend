/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import { containerStyle, selectionImageStyle, selectionLabelStyle, selectionStyle, selectionWrapperStyle, titleStyle } from './auth.style';

function SignUp() {
  const navigate = useNavigate();

  const onMemberClick = () => navigate("/auth/sign-up/member");
  const onTrainerClick = () => navigate("/auth/sign-up/trainer");

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <h2 css={titleStyle}>회원가입</h2>
        <div css={selectionWrapperStyle}>
          <div css={selectionStyle} onClick={onMemberClick}>
            <div css={selectionImageStyle}></div>
            <label css={selectionLabelStyle}>일반 회원</label>
          </div>
          <div css={selectionStyle} onClick={onTrainerClick}>
            <div css={selectionImageStyle}></div>
            <label css={selectionLabelStyle}>트레이너</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;