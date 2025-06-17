/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./BoardCategoryStyle"
import { useNavigate } from 'react-router-dom';

function BoardCategory({categoryId}: {categoryId: Number}) {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/personal-community-boards/${id}`);
  }
  return (
    <div>
        <div>
            <h1 css={s.head}>카테고리</h1>
        </div>
        <nav css={s.category}>
            <div css={s.categorys}>
                <div css={(categoryId === 1 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => navigate(`/personal-community-boards/${1}`)}><span>식단1</span></div>
                <div css={(categoryId === 2 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => navigate(`/personal-community-boards/${2}`)}><span>루틴</span></div>
                <div css={(categoryId === 3 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => navigate(`/personal-community-boards/${3}`)}><span>커뮤니티</span></div>
            </div>
            
        </nav>
    </div>
  )
}

export default BoardCategory