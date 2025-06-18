/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import Header from '../header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user.store';
import { DeleteUserRequestDto } from '@/dtos/user/request/delete-user.request.dto';
import { useCookies } from 'react-cookie';
import { DeleteUserRequest } from '@/apis/user/delete-user.api';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { buttonDeleteUserStyle, formDeleteUserStyle, formLabelDeleteUserStyle, formSectionStyle, formSpanStyle, formStyle, formTitleStyle, formWrapperStyle, inputDeleteUsernameWrapperStyle, inputDeleteUserWrapperStyle, inputStyle, layoutStyle, mainStyle, mainTitleStyle, pDeleteUserStyle } from './user.style';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { useAuthStore } from '@/stores/auth.store';

function DeleteUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
      password: "",
      deleteMessage: "",
  });
  const [_, __, removeCookie] = useCookies(["accessToken"]);
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;
  const setLogout = useAuthStore((state) => state.setLogout);
  const user = useUserStore((state) => state.user);

  if (!accessToken) return;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
  const handleDelete = async(e: FormEvent) => {
    e.preventDefault();

    const { password, deleteMessage } = form;

    if (!password) {
    alert('비밀번호를 입력해주세요.');
    return;
    }

    if (!deleteMessage || deleteMessage !== '탈퇴하겠습니다.') {
      alert('문구를 다시 확인해 주세요.');
      return;
    }

    try {
      const dto: DeleteUserRequestDto = { password, deleteMessage };
      const response = await DeleteUserRequest(dto, accessToken);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      const { name } = data;

      alert(`${name}님의 회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.`);
      removeCookie("accessToken", { path: '/' });
      setLogout();
      navigate('/');
    } catch (e) {
      console.log('회원 탈퇴 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={layoutStyle}>
        <MyPageSidebar />
        <div css={mainStyle}>
          <h2 css={mainTitleStyle}>{menuTitle}</h2>
          <form css={formWrapperStyle}>
            <div css={formSectionStyle}>
              <h2 css={formTitleStyle}>회원 탈퇴</h2>
              <div css={formStyle}>
                <label css={formLabelDeleteUserStyle}>아이디</label>
                <div css={inputDeleteUsernameWrapperStyle}>
                  <label css={formSpanStyle}>{user?.username}</label>
                </div>
              </div>
              <div css={formStyle}>
                <label css={formLabelDeleteUserStyle}>비밀번호</label>
                <div css={inputDeleteUserWrapperStyle}>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <div css={formDeleteUserStyle}>
                <p css={pDeleteUserStyle}>
                  아래 입력란에 <strong>“탈퇴하겠습니다.”</strong> 입력하시고, 확인 버튼을 눌러주세요.
                </p>
                <div css={inputDeleteUserWrapperStyle}>
                  <input
                    type="text"
                    name="deleteMessage"
                    value={form.deleteMessage}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleDelete}
                css={buttonDeleteUserStyle}
              >
                탈퇴
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteUser;