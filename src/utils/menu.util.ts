export const getMenuTitleByPath = (path: string): string => {
  const menuMap: { [key: string]: string } = {
  '/admin/trainers': '트레이너 관리',
  '/users/account-cancellation/me': '회원 탈퇴',
  '/users/members/me/one-day-tickets': '체험권',
  '/users/members/me': '개인 정보 조회 / 수정',
  '/users/members/me/setting': '개인 정보 조회 / 수정',
  '/users/trainers/me': '개인 정보 조회 / 수정',
  '/users/trainers/me/information': '상세정보 조회 / 수정',
  '/users/trainers/me/setting': '개인 정보 조회 / 수정',
  '/users/members/me/forms': '폼 작성 / 조회',
  '/users/members/me/coupons': '쿠폰',
  '/users/trainers/me/coupons': '쿠폰',
  '/users/trainers/me/match-waiting-lists' :"매칭 대기 관리",
  '/users/trainers/me/one-day-tickets': '체험권 관리',
};

  return menuMap[path] || '';
};