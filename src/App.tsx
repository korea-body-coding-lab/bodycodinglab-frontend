import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'

import SignUp from './views/auth/SignUp'
import Index from '.'
import SignUpMember from './views/auth/SignUpMember'
import SignUpTrainer from './views/auth/SignUpTrainer'
import Login from './views/auth/Login'

import TrainerCouponList from './views/coupon/TrainerCouponList'

import TrainerList from './views/admin/TrainerList'
import RecoverUsername from './views/auth/RecoverUsername'
import GetResetPasswordUser from './views/auth/GetResetPasswordUser'

import MemberCouponLIst from './views/coupon/MemberCouponLIst'
import BoardWrite from './views/board/BoardWrite'
import BoardEdit from './views/board/BoardEdit'
import Post from './views/board/Post'
import Board from './views/board/Board'

import ResetPassword from './views/auth/ResetPassword'
import DeleteUser from './views/user/DeleteUser'
import GetMemberAllTickets from './views/oneDayTicket/GetMemberAllTickets'
import MemberFormPage from './views/memberForm/MemberFormPage'
import GetMemberInfomation from './views/user/GetMemberInformation'
import UpdateMemberInformation from './views/user/UpdateMemberInformation'
import GetTrainerInformation from './views/user/GetTrainerInformation'
import UpdateTrainerInformation from './views/user/UpdateTrainerInformation'
import Note from './views/note/NotePage'
import ReapplyTrainer from './views/trainer/ReapplyTrainer'
import ReadTrainerMatchWaitingList from './views/matchWaitingList/ReadTrainerMatchWaitingList'
import UpdateProfileImage from './views/user/UpdateProfileImage'

import ReceivedNotes from './views/note/ReceivedNotes'
import SentNotes from './views/note/SentNotes'

import Subscription from './views/subscription/Subscription'
import MatchManagement from './views/MatchManagement/MatchManagement'
import TrainerInfo from './views/trainer/TrainerInfo'
import ReadTrainerMatchList from './views/match/ReadTrainerMatchList'
import { useCookies } from 'react-cookie'
import { useUserStore } from './stores/user.store'
import { useAuthStore } from './stores/auth.store'
import { useEffect } from 'react'
import { GetUserInformationRequest } from './apis/user/get-user-informaiton.api'
import TrainerDetail from './views/trainer/search/TrainerDetail'
import TrainerSearch from './views/trainer/search/TrainerSearch'
import RedirectToUserMatch from './views/board/RedirectToMatch'

import TrainerOneDayTicket from './views/oneDayTicket/TrainerOneDayTicket'

//! 프로젝트 기초 환경 설정
// 1. 외부 라이브러리 설치(의존성 설치)
// - axios
// - react-router-dom
// - zustand
// npm i 각 라이브러리명

// 2. 공통 상수 공통 함수, 공통 타입 명시

// 3. root 경로의 index.tsx에서 BrowserRouter 등록

// 4. 폴더 구조 생성
/// assets, apis(ts), components(tsx), constants(ts), layouts(tsx), stores(ts), styles(ts), types(ts), views(tsx)

// ts - export const tmp = '';
// tsx - rfce(함수형 컴포넌트 생성)
function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);
  const location = useLocation();
  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const accessToken = cookies.accessToken;
  
  useEffect(() => {
    if (!accessToken) return;

    setLogin(accessToken);

    if (!user) {
      fetchUser();
    }
    
  }, [accessToken]);

  useEffect(() => {
    if (!user) return;

    const isRejectedTrainer = user.role === 'TRAINER' && user.trainerStatus === 'REJECT';

    const allowedPaths = ['/', '/trainers/search', '/users/trainers/me/reapply'];
    const currentPath = location.pathname;
    const isAllowed = allowedPaths.includes(currentPath);

    if (isRejectedTrainer && !isAllowed) {
      if (currentPath !== '/' && currentPath !== '/auth/login') {
        alert('접근 권한이 없습니다.');
        navigate('/', { replace: true });
      }
    }
  }, [user, location.pathname]);

  const fetchUser = async() => {
    try {
      const response = await GetUserInformationRequest(accessToken);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        return;
      }

      const { id, role, username, name, profileImageUrl, trainerStatus } = data;

      setUser({
        userId: id,
        role,
        username,
        name,
        profileImageUrl,
        trainerStatus,
      });
    } catch (e) {
      console.log('사용자 정보 조회 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
        <Route path='/auth/sign-up/member' element={<SignUpMember />} />
        <Route path='/auth/sign-up/trainer' element={<SignUpTrainer />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/username/recovery' element={<RecoverUsername />} />
        <Route path='/password/reset-user' element={<GetResetPasswordUser />} />
        <Route path='/password/reset' element={<ResetPassword />} />
        <Route path='/users/members/me' element={<GetMemberInfomation />} />
        <Route path='/users/members/me/setting' element={<UpdateMemberInformation />} />
        <Route path='/users/trainers/me' element={<GetTrainerInformation />} />
        <Route path='/users/trainers/me/setting' element={<UpdateTrainerInformation />} />
        <Route path='/users/me/profile-image' element={<UpdateProfileImage />} />
        <Route path='/admin/trainers' element={<TrainerList />} />
        <Route path='/users/account-cancellation/me' element={<DeleteUser />} />
        <Route path='/users/trainers/me/information' element={<TrainerInfo />} />
        <Route path='/trainers/:trainerId' element={<TrainerDetail />} />
        <Route path='/trainers/search' element={<TrainerSearch />} />
        <Route path='/users/trainers/me/reapply' element={<ReapplyTrainer />} />

        <Route path="/personal-community-boards" element={<RedirectToUserMatch />} />
        <Route path='/personal-community-boards/:matchId/:categoryId/write' element={<BoardWrite />} />
        <Route path='/personal-community-boards/:matchId/:categoryId/:postId/edit' element={<BoardEdit />} />
        <Route path="/personal-community-boards/:matchId/:categoryId/:postId" element={<Post />} />
        <Route path='/personal-community-boards/:matchId/:categoryId' element={<Board />} />

        
        <Route path='/notes/*' element={<Note />} />
        <Route path='/notes' element={<Navigate to="/notes/allnotes" />} />
        <Route path='/users/members/me/coupons' element={<MemberCouponLIst/>}/>
        <Route path='/users/trainers/me/coupons' element={<TrainerCouponList/>}/>
        <Route path='/users/members/me/forms' element={<MemberFormPage/>}/>
        <Route path='/users/members/me/one-day-tickets' element={<GetMemberAllTickets />} />
        <Route path='/users/members/me/match-lists' element={<MatchManagement/>} />
        <Route path='/users/trainers/me/match-waiting-lists' element={<ReadTrainerMatchWaitingList/>} />
        <Route path='/users/trainers/me/match-success-lists' element={<ReadTrainerMatchList/>}/>
        <Route path='/users/members/me/subscriptions' element={<Subscription/>} />
        <Route path='/users/trainers/me/one-day-tickets' element={<TrainerOneDayTicket />} />
      </Routes>
    </>
  )
}

export default App;
