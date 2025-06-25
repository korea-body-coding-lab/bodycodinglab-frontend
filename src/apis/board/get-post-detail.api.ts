export const fetchPostDetail = async(
    matchId: number,
    categoryId: number,
    postId: number,
    token: string
  ) => {
    const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${postId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      const error = new Error("게시글 불러오기 실패");
      (error as any).status = res.status;
      throw res;
    }
    const data = await res.json();
    return data.data; 
  }