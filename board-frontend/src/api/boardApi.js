import axios from 'axios'

const BASE_URL = import.meta.evn.VITE_BOARD_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
export const registerMember = async (userData) => {
   try {
      console.log('userData: ', userData)

      const response = await boardApi.post('/auth/join', userData)
      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
