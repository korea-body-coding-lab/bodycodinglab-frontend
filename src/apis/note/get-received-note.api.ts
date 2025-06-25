export const getReceivedNotes = async(
    token: string,
    page: number,
    size: number
) => {
    const res = await fetch(`/api/v1/notes/received?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("쪽지 불러오기 실패");
    const data = await res.json();
    return data.data;
}