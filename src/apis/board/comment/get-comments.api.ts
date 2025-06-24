export const fetchComments = async(
    matchId: number, 
    categoryId: number, 
    postId: number,
    token: string
) => {
    const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${postId}/comments`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    });
    if (!res.ok) throw new Error('댓글 불러오기 실패');
    const data = await res.json();
    return data.data;
}