export const deletePost = async(
    matchId: number,
    categoryId: number,
    postId: number,
    token: string
) => {
    const response = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${(postId)}`, {
        method: 'DELETE',
        headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    },        
    });
    if (!response.ok) throw new Error("삭제 실패");
    alert("게시글이 삭제되었습니다.");
}