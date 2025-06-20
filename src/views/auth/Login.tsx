/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import Header from '../header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from '@/stores/user.store';
import { validateLoginForm } from '@/utils/login.valid';
import { LoginRequestDto } from '@/dtos/auth/request/login.request.dto';
import { loginRequest } from '@/apis/auth/login.api';
import { useAuthStore } from '@/stores/auth.store';
import { buttonLoginStyle, containerStyle, dividerStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputLoginWrapperStyle, inputStyle, linkEtcFunctionStyle, linkStyle } from './auth.style';

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...form, [name]: value }));
  };

  const handleLogin = async(e: FormEvent) => {
    e.preventDefault();

    const { username: formUsername, password } = form;

    const validMessage = validateLoginForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    try {
      const dto: LoginRequestDto = { username: formUsername, password };
      const response = await loginRequest(dto);
      const { code, message, data } = response;
  
      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }
  
      const { id, role, username, name, profileImageUrl, token, exprTime } = data;
  
      if (!exprTime || isNaN(exprTime)) {
        console.error('Invalid exprTime:', exprTime);
        return;
      }
  
      const expireDate = new Date();
      expireDate.setMilliseconds(expireDate.getMilliseconds() + exprTime);
  
      console.log('exprTime:', exprTime);
  
      setCookies("accessToken", token, {
        path: '/',
        expires: expireDate,
        sameSite: 'strict',
        secure: true,
      });
  
      setLogin(token, exprTime);
      setUser({
        userId: id,
        role,
        username,
        name,
        profileImageUrl,
      });
      navigate('/');
    } catch (e) {
      console.log('로그인 요청 오류: ', e);
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
            <h2 css={formTitleStyle}>로그인</h2>
            <div css={formStyle}>
              <div css={inputLoginWrapperStyle}>
                <input
                  type="text"
                  name='username'
                  value={form.username}
                  placeholder='아이디'
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formStyle}>
              <div css={inputLoginWrapperStyle}>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  placeholder='비밀번호'
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <button
              type='submit'
              onClick={handleLogin}
              css={buttonLoginStyle}>
              로그인
            </button>
            <div css={linkEtcFunctionStyle}>
              <Link to="/auth/finding-id" css={linkStyle}>아이디 찾기</Link>
              <span css={dividerStyle}>|</span>
              <Link to="/auth/reset-password" css={linkStyle}>비밀번호 재설정</Link>
              <span css={dividerStyle}>|</span>
              <Link to="/auth/sign-up" css={linkStyle}>회원가입</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;