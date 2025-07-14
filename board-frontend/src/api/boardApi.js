import axios from 'axios'
const BASE_URL = import.meta.env.VITE_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', // request, response 할때 json 객체로 주고 받겠다
   },
   withCredentials: true, // 세션이나 쿠키를 request에 포함
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      console.log('userData: ', userData)
      const response = await boardApi.post('/auth/join', userData)
      console.log(response)
      return response
   } catch (error) {
      console.error('API Request 오류 : ', error)
      throw error
   }
}

// 로그인
export const loginUser = async (credential) => {
   try {
      console.log('credential: ', credential)
      const response = await boardApi.post('auth/registerUser', credential)
      console.log('response: ', response)
      return response
   } catch (error) {
      console.error('API Request오류: ', error)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('auth/registerUser')
      return response
   } catch (error) {
      console.error('API Request오류: ', error)
      throw error
   }
}
