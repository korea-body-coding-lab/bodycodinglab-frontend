/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as s from "./NoteListStyle";
import { NoteType } from '@/dtos/note/request/get-note.dto';
import { getAccessTokenFromCookie, getUserIdFromToken } from '@/apis/get-token';
import { fetchUsernames } from '@/apis/get-username';
import { getNote } from '@/apis/note/get-note-detail.api';

function NoteDetail() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState<Record<number, string>>({});

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      try {
        const token = getAccessTokenFromCookie();
        if (!token) throw new Error("토큰이 없습니다.");

        const data = await getNote(Number(noteId), token)
        setNote(data);
         const userIds: number[] = [data.noteWriter, data.noteReceiver];
        
        const userMapData = await fetchUsernames(userIds);
        setUserMap(userMapData)
      } catch (e) {
        console.error('쪽지 불러오기 에러:', e);
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
                    <div css={s.profileDetail}>
                      <div css={s.profileImage}>프로필이미지</div>
                      <span css={s.profileSpan}>받은 사람: {userMap[note.noteReceiver]}</span>
                    </div>
                  ) : (
                    <div css={s.profileDetail}>
                      <div css={s.profileImage}>프로필이미지</div>
                      <span css={s.profileSpan}>보낸 사람: {userMap[note.noteWriter]}</span>
                    </div>
                  )}
                  <div>{new Date(note.noteCreateTime).toLocaleString()}</div>
                </div>
                <div css={s.noteText} >{note.noteText}</div>
                {isWriter ? <div></div> : <button css={s.sendBtn} onClick={() => navigate(`/notes/write?receiver=${note.noteWriter}`)}>답장하기</button>}
            </div>
            
        </div>
      )
}

export default NoteDetail