/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../header/Header'
import * as s from "./NotePageStyle"
import NoteNav from './NoteNav'
import { Route, Routes } from 'react-router-dom';

import ReceivedNotes from './ReceivedNotes';
import SentNotes from './SentNotes';
import WriteNote from './WriteNote';
import Allnotes from './Allnotes';
import NoteDetail from './NoteDetail';

function Note() {


  return (
    <div>
        <Header/>
        <div css={s.body}>
            <div css={s.left}>
                <NoteNav/>
            </div>
            <div css={s.right}>
                <Routes>
                    <Route path="allnotes" element={<Allnotes />} />
                    <Route path="received" element={<ReceivedNotes />} />
                    <Route path="sent" element={<SentNotes />} />
                    <Route path="write" element={<WriteNote />} />
                    <Route path=":noteId" element={<NoteDetail />} />
                    <Route path="*" element={<Allnotes />} />
                </Routes>
                
            </div>
        </div>
        
    </div>
  )
}

export default Note