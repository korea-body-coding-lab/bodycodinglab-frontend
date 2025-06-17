/** @jsxImportSource @emotion/react */
import React from 'react'
import { buttonFindUsernameStyle, containerStyle, formLabelFindUsernameStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputFindUsernameWrapperStyle, inputStyle } from './auth.style';
import Header from '../header/Header';

function ResetPassword() {
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
              <label css={formLabelFindUsernameStyle}>비밀번호</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="text"
                  name="username"
                  // value={form.username}
                  // onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formStyle}>
              <label css={formLabelFindUsernameStyle}>비밀번호 확인</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="text"
                  name="name"
                  // value={form.name}
                  // onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <button
              type="submit"
              // onClick={handleVarify}
              css={buttonFindUsernameStyle}
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