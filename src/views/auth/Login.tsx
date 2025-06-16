/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import Header from '../header/Header';
import * as authStyle from '@/views/auth/auth.style';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from '@/stores/user.store';
import { validateLoginForm } from '@/utils/login.valid';
import { LoginRequestDto } from '@/dtos/auth/request/login.request.dto';
import { loginRequest } from '@/apis/auth/login.api';

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const setLogin = useUserStore((state) => state.setLogin);

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

    const { username, password } = form;

    const validMessage = validateLoginForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    const requestBody: LoginRequestDto = { username, password };
    const response = await loginRequest(requestBody);
    const { code, message, data } = response;

    if (code !== 'SU' || !data) {
      alert(message);
      return;
    }

    const { token, exprTime, name } = data;

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

    setLogin(name);
    navigate('/');
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div css={authStyle.containerStyle}>
        <form css={authStyle.formWrapperStyle}>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formTitleStyle}>로그인</h2>
            <div css={authStyle.formStyle}>
              <div css={authStyle.inputLoginWrapperStyle}>
                <input
                  type="text"
                  name='username'
                  value={form.username}
                  placeholder='아이디'
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <div css={authStyle.inputLoginWrapperStyle}>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  placeholder='비밀번호'
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <button
              type='submit'
              onClick={handleLogin}
              css={authStyle.buttonLoginStyle}>
              로그인
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;