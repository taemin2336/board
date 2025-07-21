import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { boardComment } from '../api/boardApi'

// 댓글 등록
export const createCommentThunk = createAsyncThunk('comments/createComment', async (commentData, { rejectWithValue }) => {
   try {
      console.log(commentData)
      const response = await createComment(commentData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 게시글에 댓글 가져오기
export const fetchCommentByIdThunk = createAsyncThunk('comments/fetchCommentById', async (id, { rejectWithValue }) => {
   try {
      console.log('포스트 id: ', id)
      const response = await boardComment(id)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const commentSlice = createSlice({
   name: 'comments',
   initialState: {
      comment: null, // 댓글 데이터
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 댓글 등록
      builder
         .addCase(createCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comment = action.payload
         })
         .addCase(createCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 특정 게시물 불러오기
      builder
         .addCase(fetchCommentByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCommentByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comment = action.payload.comment // 특정 댓글 데이터
         })
         .addCase(fetchCommentByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default commentSlice.reducer
