/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from "./NoteListStyle";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAccessTokenFromCookie, getUserIdFromToken } from '@/apis/get-token';
import { fetchUsernames } from '@/apis/get-username';
import { writeNote } from '@/apis/note/post-write-note.api';

function WriteNote() {
  const [searchParams] = useSearchParams();
  const [receiver, setReceiver] = useState<number | null>(null);
  const [receiverInput, setReceiverInput] = useState<string>('');
  const [noteText, setNoteText] = useState('');
  const navigate = useNavigate();
  const [userMap, setUserMap] = useState<Record<number, string>>({});

  const handleCheckId = async () => {
    const id = Number(receiverInput);
    if (!id || isNaN(id)) {
      alert("올바른 숫자 ID를 입력하세요.");
      return;
    }
    const currentUserId = getUserIdFromToken();
    if (id === currentUserId) {
      alert("자기 자신에게는 쪽지를 보낼 수 없습니다.");
      return;
    }
    try {
      const map = await fetchUsernames([id]);
      const username = map[id];
      if (username) {
        setReceiver(id);
        setUserMap(prev => ({ ...prev, [id]: username }));
      } else {
        alert("존재하지 않는 사용자입니다.");
      }
    } catch (e) {
      alert("ID 확인 중 오류가 발생했습니다.");
    }
  };
  
  useEffect(() => {
    const r = searchParams.get("receiver");
    if (r) {
      setReceiver(Number(r));
      setReceiverInput(r);
    }
  }, [searchParams]);

  const handleSend = async () => {
    const receiverId = receiver ?? Number(receiverInput);
    if (!receiverId || isNaN(receiverId)) {
      alert("받는 사람 ID를 올바르게 입력해주세요.");
      return;
    }
    if (!noteText.trim()) {
      alert("쪽지 내용을 입력해주세요.");
      return;
    }

    try {
      const token = getAccessTokenFromCookie();
      if (!token) throw new Error("토큰이 없습니다.");

      await writeNote(noteText, receiverId, token);

      alert("쪽지가 성공적으로 전송되었습니다.");
      navigate('/notes/sent');
    } catch (error) {
      alert("쪽지 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div css={s.titlewrap}>
        <h3 css={s.title}>쪽지 보내기</h3>
      </div>
      <div css={s.noteWriteWrap}>
        <div css={s.profile}>
          <div css={s.profileImage}>프로필이미지</div>
          {receiver !== null ? (
            <span css={s.profileSpan}>보낼 사람: {userMap[receiver] ?? `${receiver}`}</span>
          ) : (
            <div>
              <input
                type="text"
                placeholder="받는 사람 ID를 입력하세요"
                value={receiverInput}
                onChange={(e) => setReceiverInput(e.target.value)}
                css={s.profileSpan}
              />
              <button css={s.profileBtn} onClick={handleCheckId}>ID 확인</button>
            </div>
            
          )}
        </div>
        <textarea
          css={s.noteText}
          placeholder="내용을 입력해주세요."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button css={s.sendBtn} onClick={handleSend}>보내기</button>
      </div>
    </div>
  );
}

export default WriteNote;
