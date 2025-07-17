import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, getBoardById, getBoards, updateBoard, deleteBoard } from '../api/boardApi'

// 게시물 등록
export const createBoardThunk = createAsyncThunk('boards/createBoard', async (boardData, { rejectWithValue }) => {
   try {
      console.log('boardData: ', boardData)
      const response = await createBoard(boardData)

      console.log(response)
      return response.data.board
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 게시물 수정
export const updateBoardThunk = createAsyncThunk('boards/updateBoard', async (data, { rejectWithValue }) => {
   try {
      const { id, boardData } = data
      console.log(data)

      const response = await updateBoard(id, boardData)
      console.log(response)
      return response.data.board
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 게시물 삭제
export const deleteBoardThunk = createAsyncThunk('boards/deleteBoard', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteBoard(id)

      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 특정 게시물 가져오기
export const fetchBoardByIdThunk = createAsyncThunk('boards/fetchBoardById', async (id, { rejectWithValue }) => {
   try {
      const response = await getBoardById(id)
      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 전체 게시물 리스트 가져오기
export const fetchBoardsThunk = createAsyncThunk('boards/fetchBoards', async (page, { rejectWithValue }) => {
   try {
      console.log('page:', page)
      const response = await getBoards(page)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      board: null,
      boards: [],
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 전체 게시물
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 특정 게시물
         .addCase(fetchBoardByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload.board
         })
         .addCase(fetchBoardByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 수정
         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
