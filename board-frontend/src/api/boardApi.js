import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      console.log('userData: ', userData)
      const response = await boardApi.post('/auth/join', userData)
      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 로그인
export const loginUser = async (credential) => {
   try {
      console.log('credential: ', credential)
      const response = await boardApi.post('/auth/login', credential)
      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 게시글 등록
export const createBoard = async (boardData) => {
   try {
      console.log('boardData: ', boardData)
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await boardApi.post('/board', boardData, config)
      console.log(response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 게시글 목록 가져오기 (페이징)
export const getBoards = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 특정 게시글 가져오기
export const getBoardById = async (id) => {
   try {
      const response = await boardApi.get(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 게시글 수정
export const updateBoard = async (id, boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await boardApi.put(`/board/${id}`, boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 게시글 삭제
export const deleteBoard = async (id) => {
   try {
      const response = await boardApi.delete(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 댓글 등록하기
export const createComment = async (data) => {
   try {
      const response = await boardApi.post(`/comment`, data)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

// 댓글 가져오기
export const boardComment = async (id) => {
   try {
      console.log('댓글가져오기', id)
      const response = await boardApi.get(`/comment/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}
