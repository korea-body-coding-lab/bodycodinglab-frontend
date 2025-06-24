// URL 상수 정의
const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080";

//# User 관련 URL
const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;
const USER_MODULE_URL = `${API_DOMAIN}/api/v1/users`;
const ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin`;
const MEMBER_MODULE_URL = `${USER_MODULE_URL}/members/me`;
const TRAINER_MODULE_URL = `${USER_MODULE_URL}/trainers/me`;
export const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
export const SIGN_UP_MEMBER_URL = `${SIGN_UP_URL}/member`;
export const SIGN_UP_TRAINER_URL = `${SIGN_UP_URL}/trainer`;
export const LOGIN_URL = `${AUTH_MODULE_URL}/login`;
export const LOGOUT_URL = `${AUTH_MODULE_URL}/logout`;
export const SEND_RESET_PASSWORD_EMAIL_URL = `${AUTH_MODULE_URL}/send-reset-password-email`;
export const VERIFY_EMAIL_URL = (token: string) => `${AUTH_MODULE_URL}/verify?token=${token}`;
export const DELETE_USER_URL = `${USER_MODULE_URL}/account-cancellation/me`;
export const FIND_USERNAME_URL = `${AUTH_MODULE_URL}/finding-id`;
export const FIND_RESET_PASSWORD_USER_URL = `${AUTH_MODULE_URL}/reset-password`;
export const RESET_PASSWORD_USER_URL = (token: string) => `${FIND_RESET_PASSWORD_USER_URL}/setting?token=${token}`;
export const GET_MEMBER_MY_INFO_URL = `${MEMBER_MODULE_URL}`;
export const GET_TRAINER_MY_INFO_URL = `${TRAINER_MODULE_URL}`;
export const UPDATE_MEMBER_MY_INFO_URL = `${MEMBER_MODULE_URL}/setting`;
export const UPDATE_TRAINER_MY_INFO_URL = `${TRAINER_MODULE_URL}/setting`;
export const UPDATE_PROFILE_IMAGE = `${USER_MODULE_URL}/me/profile-image`;
export const GET_USER_INFO_URL = `${USER_MODULE_URL}/me`;
export const GET_ALL_TRAINERS_URL = `${ADMIN_MODULE_URL}/trainers`;
export const GET_TRAINER_DETAIL_URL = (trainerId: number) => `${GET_ALL_TRAINERS_URL}/${trainerId}`;
export const UPDATE_TRAINER_STATUS_URL = (trainerId: number) => `${GET_ALL_TRAINERS_URL}/${trainerId}`;
export const REAPPLY_TRAINER_URL = (email: string) => `${AUTH_MODULE_URL}/trainer-reapply?email=${email}`;
export const GET_MEMBER_USERNAME_AND_NAME = (username: string, name: string) =>
  `${API_DOMAIN}/api/v1/members/username-and-name?username=${encodeURIComponent(username)}&name=${encodeURIComponent(name)}`;

//# 트레이너 관련 URL
const TRAINER_INFO_MODULE_URL = `${TRAINER_MODULE_URL}/information`;
const TRAINER_SEARCH_MODULE_URL = `${API_DOMAIN}/api/v1/trainers`

export const PUT_TRAINER_INFO = `${TRAINER_INFO_MODULE_URL}`;

export const POST_TRAINER_CAREER = `${TRAINER_INFO_MODULE_URL}/career`;
export const PUT_TRAINER_CAREER = `${TRAINER_INFO_MODULE_URL}/career`;
export const GET_TRAINER_CAREER = `${TRAINER_INFO_MODULE_URL}/career`;
export const DELETE_TRAINER_CAREER = (careerId: number) => `${TRAINER_INFO_MODULE_URL}/career/${careerId}`;
export const DELETE_ALL_TRAINER_CAREER = `${TRAINER_INFO_MODULE_URL}/career/all`;
export const GET_TRAINER_CAREER_RECENT = `${TRAINER_INFO_MODULE_URL}/career/recent`;

export const POST_TRAINER_LICENSE = `${TRAINER_INFO_MODULE_URL}/license`;
export const PUT_TRAINER_LICENSE = `${TRAINER_INFO_MODULE_URL}/license`;
export const GET_TRAINER_LICENSE = `${TRAINER_INFO_MODULE_URL}/license`;
export const DELETE_TRAINER_LICENSE = (licenseId: number) => `${TRAINER_INFO_MODULE_URL}/license/${licenseId}`;
export const DELETE_ALL_TRAINER_LICENSE = `${TRAINER_INFO_MODULE_URL}/license/all`;
export const GET_TRAINER_LICENSE_RECENT = `${TRAINER_INFO_MODULE_URL}/license/recent`;

export const SEARCH_TRAINER_CAREER = `${TRAINER_SEARCH_MODULE_URL}/career`;
export const SEARCH_TRAINER_LICENSE = `${TRAINER_SEARCH_MODULE_URL}/license`;
export const GET_ALL_TRAINER_INFO = `${TRAINER_SEARCH_MODULE_URL}/trainer-list`;
export const GET_TRAINER_INFO = (trainerId: number) => `${TRAINER_SEARCH_MODULE_URL}/${trainerId}`;
export const GET_TRAINER_BY_NAME = `${TRAINER_SEARCH_MODULE_URL}/search-name`;
export const GET_TRAINER_BY_ADDRESS = `${TRAINER_SEARCH_MODULE_URL}/search-address`;
export const UPDATE_INFO_IMAGES = `${TRAINER_INFO_MODULE_URL}/infos`;




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
// 보낸 쪽지 조회 `
export const GET_SENDED_NOTE_URL = `${NOTE_URL}/sendednotes`;
// 쪽지 검색(보류) searches
export const SEARCH_SENDED_NOTE_URL = (searchWord: string) => `${NOTE_URL}/search?searchWord=${encodeURIComponent(searchWord)}`;
// 쪽지 삭제 
export const DELETE_NOTE_URL = (noteId: number | string) => `${NOTE_URL}/${noteId}`;

//# 체험권 관련 URL
const MEMBER_ONE_DAY_TICKET_MODULE_URL = `${MEMBER_MODULE_URL}/one-day-tickets`;
const TRAINER_ONE_DAY_TICKET_MODULE_URL = `${TRAINER_MODULE_URL}/one-day-tickets`;
export const ISSUE_TRAINER_ONE_DAY_TICKET_URL = `${TRAINER_ONE_DAY_TICKET_MODULE_URL}/issued`;
export const GET_MEMBER_ALL_TICKETS_URL = `${MEMBER_ONE_DAY_TICKET_MODULE_URL}`;
export const GET_TRAINER_ALL_TICKETS_URL = `${TRAINER_ONE_DAY_TICKET_MODULE_URL}`;
export const GET_MEMBER_TICKETS_BY_STATUS_TICKET_URL = (status: string) => `$GET_MEMBER_ALL_TICKETS_ONE_DAY_TICKET_URL}/status?status=${status}`;
export const GET_TRAINER_TICKETS_BY_STATUS_TICKET_URL = (status: string) => `${GET_TRAINER_ALL_TICKETS_URL}/?status=${status}`;
export const USE_ONE_DAY_TICKET_URL = (ticketId: number) => `${GET_TRAINER_ALL_TICKETS_URL}/${ticketId}/used`;
export const CANCEL_ONE_DAY_TICKET_URL = (ticketId: number) => `${GET_TRAINER_ALL_TICKETS_URL}/${ticketId}/canceled`;






//# 매칭 대기 리스트 관련 URL
export const POST_MEMBER_MATCH_WAITING_LIST_URL = (trainerId: number) => `${USER_MODULE_URL}/members/trainers/${trainerId}/match-waiting-lists`;
export const GET_TRAINER_MATCH_WAITING_LIST_URL = `${TRAINER_MODULE_URL}/match-waiting-lists`;
export const GET_MEMBER_MATCH_WAITING_LIST_URL = `${MEMBER_MODULE_URL}/match-waiting-lists`;
export const PUT_TRAINER_MATCH_WAITING_LIST_APPROVE_URL = (matchWaitingListId: number) => `${GET_TRAINER_MATCH_WAITING_LIST_URL}/${matchWaitingListId}/approves`;
export const PUT_TRAINER_MATCH_WAITING_LIST_REJECT_URL = (matchWaitingListId: number) => `${GET_TRAINER_MATCH_WAITING_LIST_URL}/${matchWaitingListId}/rejects`;
export const PUT_MEMBER_MATCH_WAITIMG_LIST_CENCEL_URL = `${GET_MEMBER_MATCH_WAITING_LIST_URL}/cancels`

//# 매칭 관련 URL 
export const GET_MEMBER_MATCH_URL = `${MEMBER_MODULE_URL}/match-success-lists`;
export const GET_TRAINER_MATCH_URL = `${TRAINER_MODULE_URL}/match-success-lists`;
export const GET_TRAINER_MATCH_FIND_MEMBER_URL = (matchId: number) => `${GET_TRAINER_MATCH_URL}/${matchId}`;
export const DELETE_MEBER_MATCH_URL = (matchId: number) => `${GET_MEMBER_MATCH_URL}/${matchId}`;



// 회원 폼 생성
export const POST_FORM = `${MEMBER_MODULE_URL}/forms`;

// 회원의의 회원 폼 단건 조회
export const GET_FIND_ID_FORM = `${MEMBER_MODULE_URL}/forms`;




// 결제 생성
export const POST_PAYMENT = `${MEMBER_MODULE_URL}/match-waiting-list/payments`;


// 구독 기록 생성
export const POST_SUBSCRIPTIONS = `${GET_MEMBER_MATCH_WAITING_LIST_URL}/subscriptions`;

// 구독 기록 조회
export const GET_SUBSCRIPTIONS = `${MEMBER_MODULE_URL}/subscriptions`;



// 쿠폰 생성 
export const POST_COUPON = `${API_DOMAIN}/api/v1/coupons`;

// 회원의 사용하지 않은 혹은 기간이 만료된 쿠폰 조회
export const GET_MEMBER_COUPON_URL = (status: string) => `${MEMBER_MODULE_URL}/coupons?status=${status}`;

// 트레이너의 회원이 사용 신청한 혹은 사용 완료된 쿠폰 조회
export const GET_TRAINER_COUPON_URL =(status: string) => `${TRAINER_MODULE_URL}/coupons?status=${status}`;

// 회원의 쿠폰 사용 설정
export const PUT_MEMBER_COUPON_URL = (couponId: number) => `${MEMBER_MODULE_URL}/coupons/${couponId}`

// 트레이너의 쿠폰 사용 설정
export const PUT_TRAINER_COUPON_URL = (couponId: number) => `${TRAINER_MODULE_URL}/coupons/${couponId}`;






// 리뷰 관련 baseURL
export const REVIEW_URL = `${API_DOMAIN}/api/v1/reviews`

// 리뷰 작성
export const POST_REVIEW =(matchId: number | string) =>  `${REVIEW_URL}/${matchId}`;

// 리뷰 전체 조회
export const GET_ALL_REVIEW = `${REVIEW_URL}`;

// 회원의 내가 작성한 리뷰 조회
export const GET_WRITTEN_BY_ME_REVIEW = `${API_DOMAIN}/api/v1/members/me/reviews`;

// 트레이너의 자신에게 작성된 리뷰 조회
export const GET_WRIIEN_TO_ME_REVIEW = `${API_DOMAIN}/api/v1/trainers/me/reviews`;

// 회원의 리뷰 수정
export const PUT_REVIEW = (reviewId: number | string) => `${API_DOMAIN}/api/v1/members/me/reviews/${reviewId}`;

// 회원의 리뷰 삭제
export const DELETE_REVIEW = (reviewId: number | string) => `${API_DOMAIN}/api/v1/members/me/reviews/${reviewId}`;

// 리뷰 공감 추가
export const PUT_ADD_REVIEW_RECOMMAND = (reviewId: number | string) => `${REVIEW_URL}/${reviewId}/review-recommands`;

// 리뷰 공감 삭제
export const PUT_DELETE_REVIEW_RECOMMAND = (reviewId: number | string) => `${REVIEW_URL}/${reviewId}/review-recommands`;

// 리뷰 댓글 등록
export const POST_REVIEW_COMMENT = (reviewId: number | string) => `trainers/me/reviews/${reviewId}/comments`;

// 리뷰 댓글 조회
export const GET_ALL_REVIEW_COMMENT = (reviewId: number | string ) => `${REVIEW_URL}/${reviewId}/comments`;

// 리뷰 댓글 삭제
export const DELETE_REVIEW_COMMENT = (reviewId: number | string, commentId: number | string) => `${REVIEW_URL}/${reviewId}/comments/${commentId}`;




