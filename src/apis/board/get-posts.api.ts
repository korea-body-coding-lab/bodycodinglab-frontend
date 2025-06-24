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
    
      if (!res.ok) throw new Error("게시글 불러오기 실패");
    
      const data = await res.json();
      return data.data; 
}
