/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./BoardStyle"
import Header from '../header/Header'
import Post from './Post'
import {  useNavigate, useParams } from 'react-router-dom';
import BoardCategory from './BoardCategory';
import { getAccessTokenFromCookie } from '@/apis/get-token';
import { getUserMatchId } from '@/apis/get-user-matchId';

type BoardPost = {
    id: number;
    writerId: string | null;
    title: string;
    content: string;
    createdAt: string;
}


function Board() {
  const [matchId, setMatchId] = useState<number | null>(null);
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  // 1) matchId를 비동기로 가져오는 effect
  useEffect(() => {
    async function fetchMatchId() {
      const id = await getUserMatchId();
      console.log("fetchMatchId:", id); 
      setMatchId(id);
    }
    fetchMatchId();
  }, []);

  // 2) matchId와 categoryId가 준비되면 게시글 fetch
  useEffect(() => {
    if (!categoryId || matchId === null) {
      setLoading(true); // 아직 준비 안 됐으면 로딩중
      return;
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = getAccessTokenFromCookie();
        if (!token) throw new Error("로그인 토큰이 없습니다.");

        const res = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("게시글 불러오기 실패");

        const data = await res.json();
        console.log("게시글 데이터", data);
        setPosts(data.data);
      } catch (e) {
        alert("게시글을 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, matchId]);

  if (!categoryId) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <Header />
      <div css={s.body}>
        <div css={s.left}>
          <BoardCategory categoryId={Number(categoryId)} />
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
                  <span css={s.postIdSpan}>{post.id}</span> | <span css={s.postTitleSpan}>{post.title}</span> |{' '}
                  <span css={s.postWriterSpan}>{post.writerId}</span> |{' '}
                  <span css={s.postDateSpan}>{new Date(post.createdAt).toLocaleDateString()}</span>
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