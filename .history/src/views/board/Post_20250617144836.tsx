/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./postStyleostStyle"
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/Header';
import BoardCategory from './BoardCategory';
type PostData = {
    id: number;
    writerId: string | null;
    title: string;
    content: string;
    createdAt: string;
    postLike?: number; 
    commentCount?: number;
    viewCount?: number;
  }
function Post() {
    const {postId, categoryId} = useParams<{ postId: string; categoryId: string }>();
    console.log("params:", categoryId, postId);
    const [isProfileBoxOpen, setProfileBoxOpen] = useState(false);
    const closeModal = () => setProfileBoxOpen(false);
    const [modalProfilePosition, setProfileModalPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const [isDeleteBoxOpen, setDeleteBoxOpen] = useState(false);
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/v1/personal-community-boards/${categoryId}/${Number(postId)}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            });
        
            if (!response.ok) throw new Error("삭제 실패");
        
            alert("게시글이 삭제되었습니다.");
            setDeleteBoxOpen(false);  // 모달 닫기
            navigate(-1); // 뒤로가기 혹은 목록 페이지 이동
          } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
            console.error(error);
          }
    };
    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setProfileBoxOpen(true);
        setProfileModalPosition({ x: e.clientX, y: e.clientY });
    };
    useEffect(() => {
        const fetchPost = async () =>{
            try{
                const response = await fetch(`/api/v1/personal-community-boards/${categoryId}/${postId}`);
                if (!response.ok) throw new Error("데이터 요청 실패");

                const data = await response.json();
                console.log("백엔드 응답:", data);
                setPost(data.data);
            }catch(error){
                console.error("에러 발생!", error);
                alert("게시글을 불러오는데 실패했습니다.")
                console.log("1");
            }finally{
                setLoading(false);
            }
        };
        fetchPost();
    }, [categoryId, postId]);

    if (loading) return <div>불러오는 중...</div>;
    if (!post) return <div>게시글이 존재하지 않습니다.</div>;
    const userName = "홍길동";
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
                        <span>{post.writerId}</span>
                        <span>{post.createdAt}</span>
                    </div>
                </div>
                <div>
                {isProfileBoxOpen && (
                        <div css={s.modalOverlay} onClick={closeModal}>
                            <div css={s.profileModal(modalProfilePosition.x, modalProfilePosition.y)} onClick={(e) => e.stopPropagation()}>
                                <div css={s.modalProfileImage}></div>
                                <div css={s.profileMiddle}>
                                    <div css={s.profileUser}>{post.writerId}</div>
                                    <button css={s.modalNoteBtn}>쪽지</button>
                                </div>
                                <div css={s.searchWriter}>작성글검색</div>
                                <button css={s.closeButton} onClick={closeModal}>X</button>
                            </div>
                        </div>  
                    )}
                </div>
                <h3 css={s.title}>{post.title}</h3>
                {post.writerId != userName ? (
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
                <div css={s.postLike}>공감</div>
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
                {/* <Comment/> */}
                댓글(Comment 구현 예정)
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