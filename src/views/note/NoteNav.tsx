/** @jsxImportSource @emotion/react */
import { NavLink, useLocation } from "react-router-dom";
import * as s from "./NoteNavStyle";
import React from 'react'

function NoteNav() {
    const location = useLocation();
    const use = location.pathname.split('/')[2];//로그인해서 me 들어가면 3으로 변경
  return (
    <div>
        <nav css={s.navWrap}>
            <NavLink css={use == "allnotes" ? s.usenavDivs : s.navDivs}to="/notes/allnotes" >모든 쪽지함</NavLink>
            <NavLink css={use == "received" ? s.usenavDivs : s.navDivs}to="/notes/received" >받은 쪽지함</NavLink>
            <NavLink css={use == "sent" ? s.usenavDivs : s.navDivs}to="/notes/sent" >보낸 쪽지함</NavLink>
            <NavLink css={use == "write" ? s.usenavDivs : s.navDivs}to="/notes/write" >쪽지 보내기</NavLink>
        </nav>
    </div>
  )
}

export default NoteNav