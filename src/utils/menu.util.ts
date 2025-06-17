export const getMenuTitleByPath = (path: string): string => {
  const menuMap: { [key: string]: string } = {
  '/admin/trainers': '트레이너 관리',
  '/users/account-cancellation/me': '회원 탈퇴',
};

  return menuMap[path] || '';
};