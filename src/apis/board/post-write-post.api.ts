export const writePost = async(matchId: number, categoryId: number, formData: FormData, token: string) => {
    const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
    });

    if (!res.ok) throw new Error("게시글 작성 실패");

    const data = await res.json();
    return data.data; 
}