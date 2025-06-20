import { getAccessTokenFromCookie } from './get-token';

export async function getUserMatchId(): Promise<number | null> {
  const token = getAccessTokenFromCookie();
  if (!token) return null;

  try {
    const res = await fetch("/api/v1/users/me/match-id", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
        console.error("getUserMatchId: HTTP error", res.status);
        throw new Error("matchId 가져오기 실패");
    }
    const data = await res.json()
    console.log("getUserMatchId: response data", data);
    return data.matchId ?? null;
  } catch (error) {
    console.error("matchId 요청 오류:", error);
    return null;
  }
}