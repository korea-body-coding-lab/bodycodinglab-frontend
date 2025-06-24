/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./BoardWriteOrEditStyle"
import { useNavigate } from 'react-router-dom';
import { GetPostFormData } from '@/dtos/board/request/get-post-edit.dto';
import { getAccessTokenFromCookie } from '@/apis/get-token';
import { getUserMatchId } from '@/apis/get-user-matchId';
import { jwtDecode } from 'jwt-decode';
import { editPost } from '@/apis/board/put-edit-post.api';
import { writePost } from '@/apis/board/post-write-post.api';

function WriteOrEdit({isEdit, data, categoryId, postId}:{isEdit:boolean, data?:GetPostFormData, categoryId:number, postId?:number}){
  const navigate = useNavigate();
  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');
  const [writerId, setWriterId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [viewCount, setViewCount] = useState(0);

  // const categoryMap: Record<number, string> = {
  //   1: "MEAL",
  //   2: "ROUTINE",
  //   3: "COMMUNITY"
  // };

  useEffect(() => {
    async function fetchMatchId() {
      const id = await getUserMatchId();
      console.log("matchId:", id);  
      setMatchId(id);
    }
    fetchMatchId();
  }, []);
  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if (token) {
      const decoded: any = jwtDecode(token);
      setWriterId(decoded.userId);
    }
  }, []);

  // const category = {
  //   id: categoryId,
  //   categoryName: categoryMap[categoryId]
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);  
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if (!matchId || !writerId) {
        alert('매치 ID 또는 작성자 ID가 누락되었습니다.');
      return;
    }
    const token = getAccessTokenFromCookie();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const category = {id: categoryId};
    const json = JSON.stringify({ title, content, category, matchId, writerId, viewCount });
    const formData = new FormData();
    formData.append('data', new Blob([json], { type: 'application/json' }));
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      if (isEdit) {
        if (!postId) throw new Error("postId가 필요합니다");
        await editPost(matchId, categoryId, formData, postId, token)
      } else {
        await writePost(matchId, categoryId, formData, token)
      }
      
      alert(isEdit ? '수정 완료' : '작성 완료');
      navigate(`/personal-community-boards/${matchId}/${categoryId}`);
    } catch (error) {
      alert('오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <form css={s.right} onSubmit={handleSubmit}>
      <div css={s.headwrap}>
        <h1 css={s.head}>{isEdit ? "수정" : "글쓰기"}</h1>
      </div>
      <div css={s.titlewrap}>
        <input css={s.title} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요.' />
      </div>
      <div css={s.contentwrap}>
        <textarea css={s.content} value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용을 입력해주세요'></textarea>
      </div>
      <input css={s.file} type="file" accept="image/*" onChange={handleFileChange} />
      <button css={s.writeBtn} type='submit'>{isEdit ? "수정" : "글쓰기"}</button>
    </form>
  );
}
export default WriteOrEdit;


