export const fetchPosts = async(
  matchId: number, 
  categoryId: number, 
  token: string
) => {
    const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}`, { 
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 403) {
        const error = new Error("Forbidden");
        (error as any).status = 403;
        throw error;
      }
      if (!res.ok) {
        const error = new Error("게시글 불러오기 실패");
        (error as any).status = res.status;
        throw error;
      }
    
      const data = await res.json();
      return data.data; 
}
