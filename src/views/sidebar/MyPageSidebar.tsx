/** @jsxImportSource @emotion/react */
import LogoutButton from '@/components/LogoutButton';
import { useUserStore } from '@/stores/user.store';
import { useState } from 'react'
import { linkStyle, menuListStyle, menuStyle, profileStyle, sidebarStyle } from './sidebar.style';
import { Link } from 'react-router-dom';

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
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
  TRAINER: [
    { label: "개인 정보 조회 / 수정", path: "/users/trainers/me" },
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
};

function MyPageSidebar() {
  const [selectedMenu, setSelectedMenu] = useState("")
  const user = useUserStore((state) => state.user);
  const userRole = user?.role as UserRole | undefined;
  const menus = menuMap[userRole || "MEMBER"];
  

  return (
    <aside css={sidebarStyle}>
      <div css={profileStyle}>
        <img src="/profileImageSample.png" alt="profile" />
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