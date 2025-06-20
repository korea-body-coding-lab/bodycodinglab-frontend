export function getAccessTokenFromCookie() {
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    return match ? match[2] : null;
  } 

  export function getUserIdFromToken() {
    const token = getAccessTokenFromCookie();
    if (!token) return null;
  
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      return payload.userId || null;
    } catch (error) {
      console.error("토큰 파싱 실패:", error);
      return null;
    }
  }