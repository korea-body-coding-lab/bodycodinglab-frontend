/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './CommentStyle';
import { CommentDetailData } from '@/dtos/board/comment/request/get-comment.dto';
import getRelativeTime from './CommentTime';

function Comment({ comment, username }: { comment: CommentDetailData; username?: string }) {
  return (
    <div css={s.wrap}>
      <div css={s.profileImage}>프로필이미지</div>
      <div css={s.commnetContentBox}>
        <div css={s.commentInfoBox}>
          <div css={s.commentWriter}>{username ?? comment.commenterId}</div>
          <div css={s.createdAt}>{getRelativeTime(comment.createdAt)}</div>
        </div>
        <div css={s.commentText}>{comment.commentContent}</div>
      </div>
      <button css={s.likeBtn}>공감</button>
    </div>
  );
}

export default Comment;