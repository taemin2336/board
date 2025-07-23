import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardByIdThunk } from '../features/boardSlice'
import { fetchCommentByIdThunk } from '../features/commentSlice'
import '../styles/boardDetail.css'
import { useNavigate } from 'react-router-dom'

import { deleteBoardThunk } from '../features/boardSlice'
import { createCommentThunk } from '../features/commentSlice'
import Comment from './Comment'

import { Button, Box, Paper, TextField, InputAdornment } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

function BoardDetailPage({ isAuthenticated, user }) {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   const { boards } = useSelector((state) => state.boards)

   const findBoards = boards.filter((e) => e.id == id)
   const board = findBoards[0]

   const [comment, setComment] = useState('')

   // 게시물 삭제
   const onClickDelete = (id) => {
      const result = confirm('삭제하시겠습니까')
      if (result) {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               // 그냥 navigate만 이동시 삭제된 목록이 보이지 않으므로 삭제 후 바로 리스트 새로 불러오기
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다.' + error)
            })
      } else {
         return
      }
   }

   // 댓글 등록

   const onCommentCreate = (commentData) => {
      dispatch(createCommentThunk(commentData))
         .unwrap()
         .then(() => {
            alert('댓글이 등록되었습니다!')
            setComment(commentData.comment)
            dispatch(fetchBoardByIdThunk(id))
            dispatch(fetchCommentByIdThunk(id))
         })
         .catch((error) => {
            console.log(commentData.comment)
            console.error('댓글 등록 에러: ', error.message)
            alert('댓글 등록 에러입니다.')
         })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!comment.trim()) {
         alert('댓글을 입력해야합니다.')
         return
      }
      const commentData = {
         comment,
         board_id: parseInt(id),
         user_id: user.id,
      }
      console.log(commentData)
      onCommentCreate(commentData)
   }

   return (
      <div>
         <Box
            sx={{
               display: 'flex',
               flexWrap: 'wrap',
               '& > :not(style)': {
                  m: 1,
                  margin: '0 auto',
                  width: 900,
                  textAlign: 'center',
               },
            }}
         >
            <Paper elevation={3}>
               {board ? (
                  <>
                     <div className="border">
                        <h1>{board.title}</h1>
                        <img src={import.meta.env.VITE_APP_API_URL + board.img} alt={board.title} width="300" />
                        <p>{board.content}</p>
                     </div>
                  </>
               ) : (
                  <p>게시물을 불러오는 중입니다...</p>
               )}
            </Paper>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
               {isAuthenticated && board.User.id === user.id && (
                  <div style={{ display: 'flex', textAlign: 'right', marginRight: '30px' }}>
                     <div style={{ marginRight: '30px' }}>
                        <Button href={`/boards/edit/${board.id}`}>수정하기</Button>
                     </div>
                     <div>
                        <Button onClick={() => onClickDelete(board.id)}>삭제하기</Button>
                     </div>
                  </div>
               )}
            </div>
            <div>
               {
                  <Box component={'form'} style={{ display: 'flex' }} onSubmit={handleSubmit}>
                     <TextField
                        id="input-with-icon-textfield"
                        label="댓글"
                        slotProps={{
                           input: {
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <AccountCircle />
                                 </InputAdornment>
                              ),
                           },
                        }}
                        variant="standard"
                        style={{ width: '780px', margin: '20px' }}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                     />
                     <Button type="submit">답글 게시</Button>
                  </Box>
               }
            </div>
            <Comment />
         </Box>
      </div>
   )
}

export default BoardDetailPage
