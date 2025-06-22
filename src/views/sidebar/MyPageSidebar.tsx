/** @jsxImportSource @emotion/react */
import LogoutButton from '@/components/LogoutButton';
import { useUserStore } from '@/stores/user.store';
import { useMemo, useState } from 'react'
import { hoverText, linkStyle, loginProfile, menuListStyle, menuStyle, profileStyle, profileWrapper, sidebarStyle } from './sidebar.style';
import { Link } from 'react-router-dom';
import path from 'path';

type UserRole = "ADMIN" | "MEMBER" | "TRAINER";

// 마이페이지 메뉴 추가하면, /src/util/menu.util.ts 에도 추가
const menuMap = {
  ADMIN: [
    { label: "트레이너 관리", path: "/admin/trainers" },
    { label: "1:1 문의", path: "/member/inquiry" },
  ],
  MEMBER: [
    { label: "개인 정보 조회 / 수정", path: "/users/members/me" },
    { label: "체험권", path: "/users/members/me/one-day-tickets" },
    { label: "쿠폰", path: "/users/members/me/coupons"},
    { label: "폼 작성 / 조회", path: "/users/members/me/forms"},
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
  TRAINER: [
    { label: "개인 정보 조회 / 수정", path: "/users/trainers/me" },
    { label: "트레이너 정보 입력", path: "/users/trainers/me/information" }, 
    { label: "쿠폰", path: "/users/trainers/me/coupons"},
    { label: "매칭 대기 관리", path: "/users/trainers/me/match-waiting-lists"},
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
};

function MyPageSidebar() {
  const [selectedMenu, setSelectedMenu] = useState("")
  const user = useUserStore((state) => state.user);
  const userRole = user?.role as UserRole | undefined;
  const menus = menuMap[userRole || "MEMBER"];

  const profileImageUrl = useMemo(() => {
  return user?.profileImageUrl
    ? `http://localhost:8080${user.profileImageUrl}?v=${Date.now()}`
    : '/default-profile.png';
  }, [user?.profileImageUrl]);
  
  const handleUpdateClick = async () => {
    const popup = window.open(
      '/users/me/profile-image',
      '프로필 이미지 변경',
      'width=500, height=300, top=250, left=250, scrollbars=no, resizable=no'
    );

    if (popup === null) {
      alert('팝업 차단을 해제해주세요!');
    }
  }

  return (
    <aside css={sidebarStyle}>
      <div css={profileStyle}>
        <div css={profileWrapper}>
          <img
            src={profileImageUrl}
            alt='profile'
            onError={(e) => {
              e.currentTarget.src = '/default-profile.png';
            }}
            css={loginProfile}
          />
          <div onClick={handleUpdateClick} css={hoverText}>변경</div>
        </div>
        <p>{user?.name}</p>
        <LogoutButton />
      </div>
      <div css={menuStyle}>
        <ul css={menuListStyle}>
          {menus.map((menu) => (
            <li
              key={menu.label}
            >
              <Link
                to={menu.path}
                onClick={() => setSelectedMenu(menu.label)}
                css={linkStyle(selectedMenu === menu.label)}
              >
                {menu.label}
              </Link>
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </aside>
  );
}

export default MyPageSidebar;