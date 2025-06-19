/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as s from "./NoteListStyle";
import { NoteType } from '@/dtos/note/request/get-note.dto';
import { getAccessTokenFromCookie } from '@/get-token';

function NoteDetail() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      try {
        onst token = getAccessTokenFromCookie();
        if (!token) throw new Error("토큰이 없습니다.");

        const res = await fetch(`/api/v1/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("쪽지 불러오기 실패");
        const data = await res.json();
        setNote(data.data);
      } catch (e) {
        alert("쪽지를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (loading) return <div css={s.loading}>로딩 중...</div>;
  if (!note) return <div>쪽지를 찾을 수 없습니다.</div>;

  const isWriter = userId === note.noteWriter;
  
  return (
    
        <div>
            <div css={s.titlewrap}>
                <h3 css={s.title}> 받은 쪽지 조회</h3>
            </div>
            <div css={s.noteWriteWrap}>
                <div css={s.profile}>
                  {isWriter ? (
                    <div>
                      <div css={s.profileImage}>프로필이미지</div>
                      <span css={s.profileSpan}>받는 사람: {note.noteReceiver}</span>
                    </div>
                  ) : (
                    <div>
                      <div css={s.profileImage}>프로필이미지</div>
                      <span css={s.profileSpan}>보낸 사람: {note.noteWriter}</span>
                    </div>
                  )}
                  <div>{new Date(note.createdAt).toLocaleString()}</div>
                </div>
                <div css={s.noteText} >{note.noteText}</div>
                {isWriter ? <div></div> : <button css={s.sendBtn} onClick={() => navigate(`/notes/write?receiver=${note.noteWriter}`)}>답장하기</button>}
            </div>
            
        </div>
      )
}

export default NoteDetail