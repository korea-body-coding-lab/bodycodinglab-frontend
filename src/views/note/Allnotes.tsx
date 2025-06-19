/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./NoteListStyle"
import { useNavigate } from 'react-router-dom';
import { NoteList } from '@/dtos/note/request/get-notelist.dto';

function Allnotes() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<NoteList[]>([]);

    useEffect(() => {
            // if (!userId) {
            //   setLoading(false);
            //   return;
            // }
            const fetchPosts = async () => {
              try {
                const res = await fetch(`/api/v1/notes/allnotes`);
                if (!res.ok) throw new Error("쪽지 불러오기 실패");
                const data = await res.json();
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
            <h3 css={s.title}>모든 쪽지함</h3>
        </div>
        <div css={s.noteListWrap}>
            {loading ? (
                <div css={s.loading}>로딩 중...</div>
            ) : (
                notes.map((note) => (
                <div
                    key={note.id}
                    css={s.note}
                    onClick={() => navigate(`/notes/${note.id}`)}
                >
                    <span css={s.noteIdSpan}>{note.id}</span> | <span css={s.noteTextSpan}>{note.noteText}</span> | <span css={s.noteWriterSpan}>{note.noteWriter}</span> | <span css={s.noteReceiverSpan}>{note.noteReceiver}</span> | <span css={s.noteDateSpan}>{new Date(note.noteCreateTime).toLocaleDateString()}</span>
                </div>
                ))
            )}
        </div>
        <div css={s.page}>페이지네이션</div>
    </div>
  )
}

export default Allnotes