/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from "./BoardWriteOrEditStyle"
import { useNavigate } from 'react-router-dom';
import { GetPostFormData } from '@/dtos/board/request/get-post-edit.dto';


function WriteOrEdit({isEdit, data, categoryId, postId}:{isEdit:boolean, data?:GetPostFormData, categoryId:number, postId?:number}){
    const navigate = useNavigate();
    const [title, setTitle] = useState(data?.title || '');
    const [content, setContent] = useState(data?.content || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);  
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const formData = new FormData();
        const category = {id: categoryId}
        const json = JSON.stringify({ title, content, category });
        formData.append('data', new Blob([json], { type: 'application/json' }));

        if (selectedFile) {
          formData.append('file', selectedFile);
        } 

        try {
          let response;
      
          if (isEdit) {
            if (!postId) throw new Error("postId가 필요합니다");
      
            response = await fetch(`/api/v1/personal-community-boards/${categoryId}/${postId}`, {
              method: 'PUT',            
              body: formData,
            });
          } else {
            response = await fetch(`/api/v1/personal-community-boards/${categoryId}`, {
              method: 'POST',
              body: formData
            });
          }
      
          if (!response.ok) throw new Error('API 요청 실패');
      
          alert(isEdit ? '수정 완료' : '작성 완료');
          navigate(`/personal-community-boards/${categoryId}`);
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
            {/* <div>글쓰기 옵션</div> */}
            <div css={s.contentwrap}>
                <textarea css={s.content} value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용을 입력해주세요'></textarea>
            </div>
            <input css={s.file} type="file" accept="image/*" onChange={handleFileChange} />
            <button css={s.writeBtn} type='submit'>{isEdit ? "수정" : "글쓰기"}</button>
        </form>
    )
};
export default WriteOrEdit;

