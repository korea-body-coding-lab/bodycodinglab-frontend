/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./PostStyle"
import { PostDetailData } from '@/dtos/board/request/get-post.dto';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/Header';
import BoardCategory from './BoardCategory';
import { getAccessTokenFromCookie, getUserIdFromToken } from '@/apis/get-token';
import { getUserMatchId } from '@/apis/get-user-matchId';
import { fetchUsernames } from '@/apis/get-username';
import Comment from './comment/Comment';

function Post() {
    const [matchId, setMatchId] = useState<number | null>(null);
    const {postId, categoryId} = useParams<{ postId: string; categoryId: string }>();
    const [isProfileBoxOpen, setProfileBoxOpen] = useState(false);
    const closeModal = () => setProfileBoxOpen(false);
    const [modalProfilePosition, setProfileModalPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const [isDeleteBoxOpen, setDeleteBoxOpen] = useState(false);
    const [post, setPost] = useState<PostDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [usernameMap, setUsernameMap] = useState<Record<string, string>>({});
    const currentUserId = getUserIdFromToken();
    
    useEffect(() => {
        async function fetchMatchId() {
          const id = await getUserMatchId();
          setMatchId(id); 
        }
        fetchMatchId();
      }, []);
    const handleDelete = async () => {
        try {
            const token = getAccessTokenFromCookie();
                if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
            const response = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${Number(postId)}`, {
              method: 'DELETE',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
              
            });
            
            if (!response.ok) throw new Error("삭제 실패");
        
            alert("게시글이 삭제되었습니다.");
            setDeleteBoxOpen(false); 
            navigate(-1); 
          } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
          }
    };
    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setProfileBoxOpen(true);
        setProfileModalPosition({ x: e.clientX, y: e.clientY });
    };
    useEffect(() => {
        if (!categoryId || !postId || matchId === null) {
            setLoading(true); 
            return;
          }
        const fetchPost = async () =>{
            try{
                const token = getAccessTokenFromCookie();
                if (!token) throw new Error("로그인 토큰이 없습니다.");
                const response = await fetch(`/api/v1/personal-community-boards/${matchId}/${categoryId}/${postId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });
                
                if (!response.ok) throw new Error("데이터 요청 실패");

                const data = await response.json();
            
                setPost(data.data);
 
                
            }catch(error){
   
                alert("게시글을 불러오는데 실패했습니다.")
     
            }finally{
                setLoading(false);
            }
        };
        fetchPost();
    }, [matchId, categoryId, postId]);
    useEffect(() => {
        if (!post || !post?.writerId) return;  // null 체크 필수
        
        async function loadUsername() {
          try {
            const writerId = post!.writerId as string;
            const data = await fetchUsernames([writerId]);
            setUsernameMap(data);
          } catch (err) {
            console.error("사용자 이름 불러오기 실패", err);
          }
        }
      
        loadUsername();
      }, [post]);

    if (loading) return <div>불러오는 중...</div>;
    if (!post) return <div>게시글이 존재하지 않습니다.</div>;
    
  return (
    <div>
        <Header/>
        <div css={s.body}>
          <div css={s.left}>
            <BoardCategory categoryId={Number(categoryId)}/>
          </div>
          <div css={s.right}>
            <div css={s.postHeader}>
            <div onClick={handleProfileClick} css={s.profile}>
        
                    <div css={s.profileImage}>프로필이미지</div>
                    <div css={s.profileSub}>
                        <span>{post.writerId ? usernameMap[post.writerId] ?? post.writerId : "알 수 없음"}</span>
                        <span>{post.createdAt}</span>
                    </div>
                </div>
                <div>
                {isProfileBoxOpen && (
                        <div css={s.modalOverlay} onClick={closeModal}>
                            <div css={s.profileModal(modalProfilePosition.x, modalProfilePosition.y)} onClick={(e) => e.stopPropagation()}>
                                <div css={s.modalProfileImage}></div>
                                <div css={s.profileMiddle}>
                                    <div css={s.profileUser}>{post.writerId ? usernameMap[post.writerId] ?? post.writerId : "알 수 없음"}</div>
                                    <button css={s.modalNoteBtn}>쪽지</button>
                                </div>
                                <div css={s.searchWriter}>작성글검색</div>
                                <button css={s.closeButton} onClick={closeModal}>X</button>
                            </div>
                        </div>  
                    )} 
                </div>
                <h3 css={s.title}>{post.title}</h3>
                {post.writerId != currentUserId ? (
                    <div></div>
                    ):(
                        <div css={s.postHeaderBtns}>
                        <button css={s.postHeaderBtn} onClick={() => navigate(`./edit`)}>수정</button>
                        <button css={s.postHeaderBtn} onClick={() => setDeleteBoxOpen(true)}>삭제</button>
                        {isDeleteBoxOpen && (
                            <div css={s.modalOverlay} onClick={() => setDeleteBoxOpen(false)}>
                                <div css={s.deleteModal} onClick={e => e.stopPropagation()}>
                                    <p css={s.deleteText}>게시글을 삭제합니다.</p>
                                    <div css={s.deleteBtns}>
                                        <button css={s.deleteBtn} onClick={handleDelete}>예</button>
                                        <button css={s.deleteBtn} onClick={() => setDeleteBoxOpen(false)}>아니요</button>
                                    </div>
                                </div>
                            </div>  
                        )}
                    </div>
                    )}
            </div>
            <div css={s.postContent}>
                <div css={s.ContentText}>{post.content}</div>
                <div css={s.postLike}></div>
            </div>
            <div css={s.postFooter}>
                <div css={s.Footer}>
                    <div css={s.likeImage}></div>
                    <div>{post.postLike ?? 0}</div>
                </div>
                <div css={s.footerRight}>
                    <div css={s.Footer}>
                        <div css={s.commentImage}></div>
                        <div>{post.commentCount ?? 0}</div>
                    </div>
                    <div css={s.Footer}>
                        <div css={s.viewImage}></div>
                        <div>{post.viewCount ?? 0}</div>
                    </div>
                </div>
            </div>
            <div css={s.comment}>
                <Comment/>
                
            </div>
            <div css={s.commentWrite}>
                <textarea rows={2} css={s.commentWriteInput} placeholder='내용을 입력해주세요.' />
                <button css={s.commentWriteBtn}>작성</button>
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default Post