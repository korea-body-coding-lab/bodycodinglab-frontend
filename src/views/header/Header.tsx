/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./HeaderStyle"
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

interface LoginState{
    isLogin: boolean;

    loginClick: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    isLogin: false,
    loginClick: () => set(state => ({isLogin: state.isLogin ? false : true}))
}));

function Header() {
    const navigate = useNavigate();
    const { isLogin, loginClick } = useLoginStore();
    const userName = "홍길동";// 회원정보에서 가져옴
  return (
    <div>
        <header css={s.headerStyle}>
                <div css={s.headerUp}>
                    <div css={s.headerUpSet}>
                        <div  
                            css={s.logoStyle}
                            onClick={() => navigate('/')}
                        ></div>
                        <div>
                        {isLogin ? (
                            <div css={s.loginStyle}>
                                <div css={s.loginProfile} onClick={() => navigate('/mypage')} />
                                <span>{userName}님</span>
                                <button css={s.loginStyleBtn} onClick={() => navigate('/notes')}>쪽지</button>
                                <button css={s.loginStyleBtn} onClick={loginClick}>로그아웃</button>
                            </div>
                            ) : (
                            <div css={s.logoutStyle}>
                                <a css={s.logoutStyleA} href="/auth/sign-up">회원가입</a>
                                <a css={s.logoutStyleA} href="/auth/sign-in">로그인</a>
                                <button onClick={loginClick}>로그인(테스트)</button>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                
                <nav css={s.headerNav}>
                    <div css={s.headerNavDivs} onClick={() => navigate('/fitmateintro')}>핏메이트 소개</div>
                    <div css={s.headerNavDivs} onClick={() => navigate('/find-trainer')}>트레이너 찾기</div>
                    <div css={s.headerNavDivs} onClick={() => navigate('/personal-community-boards')}>1대1 커뮤니티</div>
                </nav>
            </header>
        </div>
  )
}

export default Header