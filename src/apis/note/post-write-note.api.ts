export const writeNote = async(
    noteText: string,
    receiverId: number,
    token: string
) => {
    const response = await fetch('/api/v1/notes', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            noteText: noteText,
            noteReceiver: receiverId,
        }),
    });

    if (!response.ok) throw new Error("쪽지 전송 실패");
}