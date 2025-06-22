/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./NoteListStyle"
import { useNavigate } from 'react-router-dom';
import { NoteList } from '@/dtos/note/request/get-notelist.dto';
import { getAccessTokenFromCookie } from '@/apis/get-token';
import { fetchUsernames } from '@/apis/get-username';


function SentNotes() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<NoteList[]>([]);
    const [userMap, setUserMap] = useState<Record<number, string>>({});

    useEffect(() => {
            // if (!userId) {
            //   setLoading(false);
            //   return;
            // }
            const fetchPosts = async () => {
              try {
                const token = getAccessTokenFromCookie();
                  if (!token) throw new Error("토큰이 없습니다.");
                const res = await fetch(`/api/v1/notes/sent`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });
                if (!res.ok) throw new Error("쪽지 불러오기 실패");
                const data = await res.json();

                const userIds: number[] = Array.from(new Set(data.data.flatMap((note: NoteList) => [note.noteWriter, note.noteReceiver])));
                
                const userMapData = await fetchUsernames(userIds);
                setUserMap(userMapData);
                setNotes(data.data); 
              } catch (e) {
                alert("쪽지를 가져오지 못했습니다.");
              } finally {
                setLoading(false);
              }
            };
            fetchPosts();
          },[]);

  return (
    <div>
        <div css={s.titlewrap}>
            <h3 css={s.title}>보낸 쪽지함</h3>
        </div>
        <div css={s.noteListWrap}>
            <div css={s.spanHead}>
              <span css={s.noteIdSpan}>노트id</span>
              <span css={s.noteTextHead}>노트 내용</span>
              <span css={s.noteWriterSpan}>보낸사람</span>
              <span css={s.noteReceiverSpan}>받은사람</span>
              <span css={s.noteDateSpan}>작성일</span></div>
          
            {loading ? (
                <div css={s.loading}>로딩 중...</div>
            ) : (
                notes.map((note) => (
                <div
                    key={note.id}
                    css={s.note}
                    onClick={() => navigate(`/notes/${note.id}`)}
                >
                      <div css={s.spans}>
                        <span css={s.noteIdSpan}>{note.id}</span>
                        <span css={s.noteTextSpan}>{note.noteText}</span>
                        <span css={s.noteWriterSpan}>{userMap[note.noteWriter]}</span>
                        <span css={s.noteReceiverSpan}>{userMap[note.noteReceiver]}</span>
                        <span css={s.noteDateSpan}>{new Date(note.noteCreateTime).toLocaleDateString()}</span>
                      </div>
                </div>
                ))
            )}
        </div>
        <div css={s.page}>페이지네이션</div>
    </div>
  )
}

export default SentNotes