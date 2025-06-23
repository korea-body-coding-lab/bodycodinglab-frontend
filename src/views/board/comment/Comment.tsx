/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./CommentStyle"

function Comment() {
  return (
    <div css={s.wrap}>
        <div css={s.profileImage}>프로필이미지</div>
        <div css={s.commentWriter}>작성자</div>
        <span css={s.commentText}>댓글 내용</span>
        <button css={s.likeBtn}>공감</button>
    </div>
  )
}

export default Comment