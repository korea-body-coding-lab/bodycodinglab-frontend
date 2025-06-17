/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./BoardStyle"
import Header from '../header/Header'
import Post from './Post'
import {  useNavigate, useParams } from 'react-router-dom';
import BoardCategory from './BoardCategory';

type BoardPost = {
    id: number;
    writerId: string | null;
    title: string;
    content: string;
    createdAt: string;
}

function Board() {
    const navigate = useNavigate();
    const {categoryId} = useParams<{categoryId: string}>();
    const [posts, setPosts] = useState<BoardPost[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!categoryId) {
          setLoading(false);
          return;
        }
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/v1/personal-community-boards/${categoryId}`);
            if (!res.ok) throw new Error("게시글 불러오기 실패");
            const data = await res.json();
            setPosts(data.data); 
          } catch (e) {
            alert("게시글을 가져오지 못했습니다.");
          } finally {
            setLoading(false);
          }
        };
        fetchPosts();
      }, [categoryId]);
      
      if (!categoryId) return <div>잘못된 접근입니다.</div>;
  return (
    <div>
        <Header/>
        <div css={s.body}>
            
            <div css={s.left}>
                
                <BoardCategory categoryId={Number(categoryId)}/>
            </div>
            {/* <div>
                정렬 옵션
                <div>글쓰기</div>
            </div> */}
            <div css={s.right}>
                <div css={s.headwrap}>
                    <h1 css={s.head}>
                        {categoryId === '1' && '식단 '}
                        {categoryId === '2' && '루틴 '}
                        {categoryId === '3' && '커뮤니티 '}
                        게시판
                    </h1>
                </div>
                <div css={s.rightTop}>
                    <div css={s.search}>
                        <input css={s.searchInput}type="text" placeholder='키워드를 입력해주세요.'/>
                        <button css={s.searchBtn}>검색</button>
                    </div>
                    <button onClick={() => navigate('./write')} css={s.writeBtn}>글쓰기</button>
                </div>
                <div css={s.board}>
                    {loading ? (
                        <div css={s.loading}>로딩 중...</div>
                    ) : (
                        posts.map((post) => (
                        <div
                            key={post.id}
                            css={s.post}
                            onClick={() => navigate(`/personal-community-boards/${categoryId}/${post.id}`)}
                        >
                            <span>{post.id}</span> | {post.title} | {post.writerId} | {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        ))
                    )}
                </div>
               < div css={s.boardBottom}>페이지네이션</div>
            </div>
           
        </div>
    </div>
  )
}

export default Board