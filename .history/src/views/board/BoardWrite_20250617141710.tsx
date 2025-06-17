/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./BoardWriteOrEditStyle"
import Header from '../header/Header'
import BoardCategory from './BoardCategory'
import WriteOrEdit from './WriteOrEdit';
import { useParams } from 'react-router-dom';



function BoardWrite() {
 
  const {categoryId} = useParams<{categoryId: string}>();
  const parsedCategoryId = parseInt(categoryId || '1', 10);
  return (
    <div>
        <Header/>
        <div css={s.body}>
          <div css={s.left}>
            <BoardCategory categoryId={parsedCategoryId}/>
          </div>
          <WriteOrEdit isEdit={false} categoryId={parsedCategoryId}/>
        </div>
    </div>
  )
}

export default BoardWrite