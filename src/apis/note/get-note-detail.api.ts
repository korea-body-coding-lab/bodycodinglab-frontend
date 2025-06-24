export const getNote = async(
    noteId: number,
    token: string
) => {
    const res = await fetch(`/api/v1/notes/${noteId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error("쪽지 불러오기 실패");
    const data = await res.json();
    return data.data;
}