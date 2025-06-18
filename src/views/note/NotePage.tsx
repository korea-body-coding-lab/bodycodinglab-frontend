/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../header/Header'
import * as s from "./NotePageStyle"
import NoteNav from './NoteNav'
import { useLocation, useNavigate } from 'react-router-dom';
import Allnotes from './Allnotes';
import ReceivedNotes from './ReceivedNotes';

function Note() {
    const location = useLocation();
    const use = location.pathname.split('/')[2];
    let content;
    if (use === "allnotes") content = <Allnotes />;
    else if (use === "received") content = <ReceivedNotes />;
    // else if (use === "sent") content = <SentNotes />;
    // else if (use === "write") content = <WriteNote />;
  return (
    <div>
        <Header/>
        <div css={s.body}>
            <div css={s.left}>
                <NoteNav/>
            </div>
            <div css={s.right}>
                {content}
                
            </div>
        </div>
        
    </div>
  )
}

export default Note