/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from "./BoardWriteOrEditStyle"
import { useNavigate } from 'react-router-dom';
type postData={
    title:string,
    content:string
   }

function WriteOrEdit({isEdit, data, categoryId}:{isEdit:boolean, data?:postData, categoryId:number}){
    const navigate = useNavigate();
    const [title, setTitle] = useState(data?.title || '');
    const [content, setContent] = useState(data?.content || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postData = {title, content};

        // Api 요청 코드
        console.log(isEdit ? "수정 요청" : "작성 요청", postData);

        navigate(`/personal-community-boards/${categoryId}`);
    }

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
            <button css={s.writeBtn} type='submit'>{isEdit ? "수정" : "글쓰기"}</button>
        </form>
    )
};
export default WriteOrEdit;

