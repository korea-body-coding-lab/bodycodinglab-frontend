/** @jsxImportSource @emotion/react */
import { useUserStore } from '@/stores/user.store';
import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [_, __, removeCookie] = useCookies(["accessToken"]);
  const setLogout = useUserStore((state) => state.setLogout);
  const navigate = useNavigate();

  const handleLogout= () => {
    removeCookie("accessToken", { path: '/' });
    setLogout();
    alert('로그아웃 되었습니다.');
    navigate('/')
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '10px',
        marginTop: '10px'
      }}
    >
      로그아웃
    </button>
  );
}

export default LogoutButton;