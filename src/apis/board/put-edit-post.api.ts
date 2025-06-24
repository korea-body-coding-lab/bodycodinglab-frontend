export const editPost = async(
  matchId: number, 
  categoryId: number, 
  formData: FormData, 
  postId: number, 
  token: string
) => {
    const res =  await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${postId}`, {
        method: 'PUT',             
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
    });

    if (!res.ok) throw new Error("게시글 불러오기 실패");

    const data = await res.json();
    return data.data; 
}