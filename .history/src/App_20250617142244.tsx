import { Route, Routes } from 'react-router-dom'
import './App.css'
import Board from './views/board'
import SignUp from './views/auth/SignUp'
import Index from '.'
import MemberSignUp from './views/auth/MemberSignUp'
import TrainerSignUp from './views/auth/TrainerSignUp'
import TrainerCareer from './views/trainer/TrainerCareer'
import Login from './views/auth/Login'

import TrainerCouponList from './views/coupon/TrainerCouponList'

import TrainerList from './views/admin/TrainerList'
import BoardWrite from './views/board/BoardWrite'
import BoardEdit from './views/board/BoardEdit'
import Post from './views/board/Post'


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

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
        <Route path='/auth/sign-up/member' element={<MemberSignUp />} />
        <Route path='/auth/sign-up/trainer' element={<TrainerSignUp />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/admin/trainers' element={<TrainerList />} />
        <Route path="/personal-community-boards" element={<Navigate'
           to="/personal-community-boards/1" />} />
        <Route path='/personal-community-boards/:categoryId/write' element={<BoardWrite />} />
        <Route path='/personal-community-boards/:categoryId/edit' element={<BoardEdit />} />
        <Route path="/personal-community-boards/:categoryId/:postId" element={<Post />} />
        <Route path='/users/trainers/me/career' element={<TrainerCareer />} />
        <Route path='/users/trainers/me/coupons' element={<TrainerCouponList/>}/>
      </Routes>
    </>
  )
}

export default App;
