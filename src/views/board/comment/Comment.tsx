/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './CommentStyle';
import { CommentDetailData } from '@/dtos/board/comment/request/get-comment.dto';
import getRelativeTime from '../../../utils/createdat-relative.util';

function Comment({ comment, username, profileImageUrl }: { comment: CommentDetailData; username?: string; profileImageUrl: string }) {
  return (
    <div css={s.wrap}>
      <img css={s.profileImage} src={profileImageUrl ?? '/default-profile.png'} alt="profile"></img>
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