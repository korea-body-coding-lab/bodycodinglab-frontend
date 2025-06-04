// URL 상수 정의
const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080";

//# 게시글 관련 베이스 URL
export const PERSONAL_COMMUNITY_BOARD_URL = `${API_DOMAIN}/api/v1/personal-community-boards`;

// 게시글 등록
export const POST_BOARD_URL = (matchId: number | string, categoryId: number | string)  => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}`;
// 게시글 전체 조회
export const GET_ALL_BOARD_URL = (matchId: number | string)  => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}`;
// 게시글 단건 조회
export const GET_BOARD_URL = (matchId: number | string, categoryId: number | string) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}`;
// 게시글 검색
export const SEARCH_BOARD_URL = (matchId: number | string, searchWord: string) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/search?searchWord=${encodeURIComponent(searchWord)}`;
// 게시글 수정
export const UPDATE_BOARD_URL = (matchId: number | string, categoryId: number | string) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}`;
// 게시글 삭제
export const DELETE_BOARD_URL = (matchId: number | string, categoryId: number | string, postId: number) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}/${postId}`;

//# 댓글 관련
// 댓글 생성
export const POST_COMMENT_URL = (matchId: number | string, categoryId: number | string, postId: number) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}/${postId}/comments`;
// 댓글 전체 조회
export const GET_COMMENT_URL = (matchId: number | string, categoryId: number | string, postId: number) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}/${postId}/comments`;
// 댓글 검색
export const SEARCH_COMMENT_URL = (matchId: number | string, searchWord: string) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/comments/search?searchWord=${encodeURIComponent(searchWord)}`;
// 댓글 수정
export const UPDATE_COMMENT_URL = (matchId: number | string, categoryId: number | string, postId: number) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}/${postId}/comments`;
// 댓글 삭제
export const DELETE_COMMENT_URL = (matchId: number | string, categoryId: number | string, postId: number) => `${PERSONAL_COMMUNITY_BOARD_URL}/${matchId}/${categoryId}/${postId}/comments`;

//# 쪽지 관련 베이스 URL
export const NOTE_URL = `${API_DOMAIN}/api/v1/notes`;

// 쪽지 작성
export const POST_NOTE_URL = `${NOTE_URL}`;
// 전체 쪽지 조회
export const GET_ALL_NOTE_URL = `${NOTE_URL}`;
// 쪽지 단건 조회
export const GET_NOTE_URL = (noteId: number | string) => `${NOTE_URL}/${noteId}`;
// 받은 쪽지 조회 
export const GET_RECEIVED_NOTE_URL = `${NOTE_URL}/receivednotes`;
// 보낸 쪽지 조회 
export const GET_SENDED_NOTE_URL = `${NOTE_URL}/sendednotes`;
// 쪽지 검색(보류) searches
export const SEARCH_SENDED_NOTE_URL = (searchWord: string) => `${NOTE_URL}/search?searchWord=${encodeURIComponent(searchWord)}`;
// 쪽지 삭제 
export const DELETE_NOTE_URL = (noteId: number | string) => `${NOTE_URL}/${noteId}`;








