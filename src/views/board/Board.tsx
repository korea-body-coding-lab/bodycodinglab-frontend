/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./BoardStyle"
import Header from '../header/Header'
import {  useNavigate, useParams } from 'react-router-dom';
import BoardCategory from './BoardCategory';
import { getAccessTokenFromCookie } from '@/apis/get-token';
import { getUserMatchId } from '@/apis/get-user-matchId';
import { fetchPosts } from '@/apis/board/get-posts.api';
import { BoardPost } from '@/utils/board-post.util';




function Board() {
  const [matchId, setMatchId] = useState<number | null>(null);
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const numericCategoryId = Number(categoryId);

  useEffect(() => {
    async function fetchMatchId() {
      try {
        const id = await getUserMatchId();
        if (id === null) {
          alert("매칭 정보가 없습니다.");
          navigate("/"); 
          return;
        }
        setMatchId(id);
      } catch (e) {
        alert("매칭 정보를 가져올 수 없습니다.");
        navigate("/");
      }
    }
    fetchMatchId();
  }, []);

  useEffect(() => {
    if (!categoryId || matchId === null) return;
    const getPosts = async () => {
      try {
        setLoading(true);
        const token = getAccessTokenFromCookie();
        if (!token) throw new Error("로그인 토큰이 없습니다.");

        const data = await fetchPosts(matchId, numericCategoryId, token);
        setPosts(data);
      } catch (e:any) {
        if (e.status === 403) {
          alert("해당 게시판에 접근할 수 없습니다.");
          navigate("/")
        }else{
          alert("게시글을 가져오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [categoryId, matchId]);

  if (!categoryId) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <Header />
      <div css={s.body}>
        <div css={s.left}>
          <BoardCategory categoryId={numericCategoryId} />
        </div>
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
              <input css={s.searchInput} type="text" placeholder="키워드를 입력해주세요." />
              <button css={s.searchBtn}>검색</button>
            </div>
            <button onClick={() => navigate('./write')} css={s.writeBtn}>
              글쓰기
            </button>
          </div>
          <div css={s.board}>
            <div css={s.spanHead}>
              <span css={s.postIdSpan}>게시글id</span>
              <span css={s.postTitleSpan}>게시글 제목</span>
              <span css={s.postWriterSpan}>작성자</span>
              <span css={s.postDateSpan}>작성일</span>
            </div>
              {loading ? (
                <div css={s.loading}>로딩 중...</div>
              ) : posts.length === 0 ? (
                <div>게시글이 없습니다.</div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    css={s.post}
                    onClick={() => navigate(`/personal-community-boards/${matchId}/${categoryId}/${post.id}`)}
                  >
                    <div css={s.spans}>
                      <span css={s.postIdSpan}>{post.id}</span>
                      <span css={s.postTitleSpan}>{post.title}</span>
                      <span css={s.postWriterSpan}>{post.writerName}</span>
                      <span css={s.postDateSpan}>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                  </div>
                ))
              )}
            
          </div>
          <div css={s.boardBottom}>페이지네이션</div>
        </div>
      </div>
    </div>
  );
}
export default Board; 