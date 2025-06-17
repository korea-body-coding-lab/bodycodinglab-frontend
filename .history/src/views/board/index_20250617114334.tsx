/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./BoardStyle"
import Header from '../header/Header'






function Index() {
    
    
  return (
    <div>
        <Header/>
        <div>
            <div>
                <nav css={s.category}>
                    <div css={s.categorys}>
                        <div css={s.categoryDivs}>식단</div>
                        <div css={s.categoryDivs}>루틴</div>
                        <div css={s.categoryDivs}>커뮤니티</div>
                    </div>
                    <div css={s.writeBtn}>글쓰기</div>
                </nav>
                
            </div>
            {/* <div>
                정렬 옵션
                <div>글쓰기</div>
            </div> */}
            <div css={s.search}>
                <input css={s.searchInput}type="text" placeholder='키워드를 입력해주세요.'/>
                <button css={s.searchBtn}>검색</button>
            </div>
            <div css={s.board}>
                게시글
            </div>
        </div>
    </div>
  )
}

export default Index