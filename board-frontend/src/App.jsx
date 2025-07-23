import './styles/common.css'
import Navbar from './components/shared/Navbar'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import BoardList from './pages/BoardList'
import BoardDetailPage from './pages/BoardDetailPage'
import BoardCreatePage from './pages/BoardCreatePage'

import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import EditPage from './pages/EditPage'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태, 로그인한 사용자 정보(로그아웃 상태일때는 null)
   const location = useLocation()
   //location.key: 현재 위치 고유의 키
   console.log('location.key', location.key)

   // 새로고침시 redux 에서 사용하는 state가 사라지므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<BoardList isAuthenticated={isAuthenticated} user={user} key={location.key} />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/boards/create" element={<BoardCreatePage />} />
            <Route path="/boards/edit/:id" element={<EditPage />} />
            <Route path="/boards/detail/:id" element={<BoardDetailPage isAuthenticated={isAuthenticated} user={user} key={location.key} />} />
         </Routes>
      </>
   )
}

export default App
