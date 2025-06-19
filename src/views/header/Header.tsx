/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./HeaderStyle";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import LogoutButton from "@/components/LogoutButton";
import { useAuthStore } from "@/stores/auth.store";


function Header() {
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);

  const handleProfileClick = () => {
    if (user?.role === 'MEMBER') navigate('/users/members/me');
    if (user?.role === 'TRAINER') navigate('/users/trainers/me');
    if (user?.role === 'ADMIN') navigate('/admin/trainers');
  }


  return (
    <div>
      <header css={s.headerStyle}>
        <div>
          <div css={s.headerUpSet}>
            <div css={s.logoStyle} onClick={() => navigate("/")}></div>
            <nav css={s.headerNav}>
            <div css={s.headerNavDivs} onClick={() => navigate('/fitmateintro')}>핏메이트 소개</div>
            <div css={s.headerNavDivs} onClick={() => navigate('/find-trainer')}>트레이너 찾기</div>
            {isLogin ? (<div css={s.headerNavDivs} onClick={() => navigate('/personal-community-boards')}>1대1 커뮤니티</div>) : <div></div>}
        </nav>
            <div>
              {isLogin ? (
                <div css={s.loginStyle}>
                  <img
                    src={user?.profileImageUrl ? `http://localhost:8080${user.profileImageUrl}` : '/default-profile.png'}
                    alt='profile'
                    onClick={handleProfileClick}
                    onError={(e) => {
                      e.currentTarget.src = 'default-profile.png';
                    }}
                    css={s.loginProfile}
                  />
                  <span>{user?.name}님</span>
                  
                  <button
                    css={s.loginStyleBtn}
                    onClick={() => navigate("/notes")}
                  >
                    쪽지
                  </button>
                  
                  <LogoutButton />
                </div>
              ) : (
                <div css={s.isLogin}>
                  <Link to="/auth/login" css={s.linkStyle}>로그인</Link>
                  <span css={s.dividerStyle}>/</span>
                  <Link to="/auth/sign-up" css={s.linkStyle}>회원가입</Link>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </header> 
    </div>
  );
}

export default Header;
