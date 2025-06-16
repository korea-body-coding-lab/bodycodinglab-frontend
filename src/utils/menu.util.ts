export const getMenuTitleByPath = (path: string): string => {
  const menuMap: { [key: string]: string } = {
  '/admin/trainers': '트레이너 관리',
};

  return menuMap[path] || '';
};