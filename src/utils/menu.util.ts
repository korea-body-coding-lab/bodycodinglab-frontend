export const getMenuTitleByPath = (path: string): string => {
  const menuMap: { [key: string]: string } = {
  '/admin/trainers': '트레이너 관리',
  '/users/account-cancellation/me': '회원 탈퇴',
  '/users/members/me/one-day-tickets': '체험권',
};

  return menuMap[path] || '';
};