import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BOARD_API_URL

//axios 인스턴스 생성
const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', // request, response 할때 json 객체로 주고 받겠다
   },
   withCredentials: true, // 세션이나 쿠키를 request에 포함
})

// 회원가입
export const registerUser = async (memberData) => {
   try {
      console.log('memberDate: ', memberData)

      const response = await boardApi.post('/auth/join', memberData)
      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
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
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 게시판 등록
export const createBoard = async (boardData) => {
   try {
      console.log('boardData: ', boardData)

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }

      const response = await boardApi.post('/board', boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 전체 보드 가져오기(페이징)
export const getBoards = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 특정 보드 가져오기
export const getBoardById = async (id) => {
   try {
      const response = await boardApi.get(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 보드 수정
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
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 보드 삭제
export const deleteBoard = async (id) => {
   try {
      const response = await boardApi.delete(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
