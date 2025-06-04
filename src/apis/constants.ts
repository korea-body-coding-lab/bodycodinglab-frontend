// URL 상수 정의
const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080";

//# User 관련 URL
const USER_MODULE_URL = `${API_DOMAIN}/api/v1/users`;
const MEMBER_MODULE_URL = `${USER_MODULE_URL}/members`;
const TRAINER_MODULE_URL = `${USER_MODULE_URL}/trainers`;
export const SIGN_UP_URL = `${USER_MODULE_URL}/signup`;
export const SIGN_UP_MEMBER_URL = `${SIGN_UP_URL}/member`;
export const SIGN_UP_TRAINER_URL = `${SIGN_UP_URL}/trainer`;
export const SIGN_IN_URL = `${USER_MODULE_URL}/login`;
export const SIGN_OUT_URL = `${USER_MODULE_URL}/logout`;
export const DELETE_USER_URL = `${USER_MODULE_URL}/me`;
export const GET_USERNAME_URL = `${USER_MODULE_URL}/finding-id`;
export const GET_SET_PASSWORD_USER_URL = `${USER_MODULE_URL}/setting-pw`;
export const POST_SET_PASSWORD_USER_URL = (userId: number) => `${USER_MODULE_URL}/setting-pw/${userId}`;
export const GET_MEMBER_MY_INFO_URL = `${MEMBER_MODULE_URL}/me`;
export const GET_TRAINER_MY_INFO_URL = `${TRAINER_MODULE_URL}/me`;
export const PUT_MEMBER_MY_INFO_URL = `${MEMBER_MODULE_URL}/me/setting`;
export const PUT_TRAINER_MY_INFO_URL = `${TRAINER_MODULE_URL}/me/setting`;
export const GET_ALL_TRAINER_URL = `${TRAINER_MODULE_URL}`;
export const GET_TRAINER_URL = (trainerId: number) => `${TRAINER_MODULE_URL}/${trainerId}`;
export const PUT_TRAINER_APPROVAL_URL = (trainerId: number, trainerStatus: string) => `${TRAINER_MODULE_URL}/${trainerId}/${trainerStatus}`;

//# 매칭 관련 URL
const MEMBER_MATCH_WAITING_MODULE_URL = `${MEMBER_MODULE_URL}/me/match-waiting-lists`;
const TRAINER_MATCH_WAITING_MODULE_URL = `${TRAINER_MODULE_URL}/me/match-waiting-lists`;
const MEMBER_MATCH_MODULE_URL = `${MEMBER_MODULE_URL}/me/match-success-lists`;
const TRAINER_MATCH_MODULE_URL = `${TRAINER_MODULE_URL}/me/match-success-lists`;
export const POST_MATCH_WAITING_URL = `${MEMBER_MATCH_WAITING_MODULE_URL}`;
export const GET_MATCH_WAITING_TRAINER_URL = `${MEMBER_MATCH_WAITING_MODULE_URL}`;
export const GET_MATCH_WAITING_MEMBER_URL = `${TRAINER_MATCH_WAITING_MODULE_URL}`;
export const DELETE_MATCH_MEMBER_APPROVAL_URL = (matchWaitingId: number, matchIsAdmission: boolean) => `${TRAINER_MATCH_WAITING_MODULE_URL}/${matchWaitingId}/${matchIsAdmission}`;
export const POST_MATCH_URL = `${TRAINER_MATCH_MODULE_URL}`;
export const GET_MATCH_TRAINER_URL = `${MEMBER_MATCH_MODULE_URL}`;
export const GET_MATCH_ALL_MEMBER_URL = `${TRAINER_MATCH_MODULE_URL}`;
export const GET_MATCH_MEMBER_URL = (memberId: number) => `${TRAINER_MATCH_MODULE_URL}/${memberId}`;
export const DELETE_MATCH_URL = (trainerId: number) => `${MEMBER_MATCH_WAITING_MODULE_URL}/${trainerId}`;

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

//# 체험권 관련 URL
const MEMBER_ONEDAY_TICKET_MODULE_URL = `${MEMBER_MODULE_URL}/me/oneday-tickets`;
const TRAINER_ONEDAY_TICKET_MODULE_URL = `${TRAINER_MODULE_URL}/me/oneday-tickets`;
export const POST_MEMBER_ONEDAY_TICKET_URL = `${MEMBER_ONEDAY_TICKET_MODULE_URL}`;
export const POST_TRAINER_ONEDAY_TICKET_URL = `${TRAINER_ONEDAY_TICKET_MODULE_URL}`;
export const GET_ALL_TRAINER_ONEDAY_TICKET_URL = `${MEMBER_ONEDAY_TICKET_MODULE_URL}`;
export const GET_ALL_MEMBER_ONEDAY_TICKET_URL = `${TRAINER_ONEDAY_TICKET_MODULE_URL}`;
export const GET_TRAINER_ONEDAY_TICKET_URL = (ticketStatus: string) => `${MEMBER_ONEDAY_TICKET_MODULE_URL}/?status=${ticketStatus}`;
export const GET_MEMBER_ONEDAY_TICKET_URL = (ticketStatus: string) => `${TRAINER_ONEDAY_TICKET_MODULE_URL}/?status=${ticketStatus}`;
// ----- 체험권 사용, 승인, 거부 설정 ----- //
export const PUT_USE_ONEDAY_TICKET_URL = `${TRAINER_ONEDAY_TICKET_MODULE_URL}/used-date`;
export const PUT_APPROVE_ONEDAY_TICKET_URL = `${TRAINER_ONEDAY_TICKET_MODULE_URL}/approval-date`;
export const PUT_REJECT_ONEDAY_TICKET_URL = `${TRAINER_ONEDAY_TICKET_MODULE_URL}/reject-progress-reason`;