import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard } from '../api/boardApi'

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

const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      board: null,
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
   },
})

export default boardSlice.reducer