export const writeComment = async(
    matchId: number, 
    categoryId: number,
    postId: number, 
    token: string,
    newComment: string
) => {
    const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentContent: newComment,
        }),
    });
    window.location.reload();
    if (!res.ok) throw new Error("댓글 작성 실패");

    const data = await res.json();
    return data.data;
}