import { getAccessTokenFromCookie } from '@/apis/get-token';

export async function fetchUsernames(userIds: (string | number)[]): Promise<Record<string, string>> {
  if (userIds.length === 0) return {};

  const token = getAccessTokenFromCookie();
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const res = await fetch('/api/v1/users/usernames', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userIds),
  });

  if (!res.ok) {
    throw new Error('사용자 이름 불러오기 실패');
  }

  const data = await res.json();
  return data;
}