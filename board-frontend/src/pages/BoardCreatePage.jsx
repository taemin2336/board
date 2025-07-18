import { Container } from '@mui/material'
import BoardCreateForm from '../components/Board/BoardCreateForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBoardThunk } from '../features/boardSlice'

function BoardCreatePage() {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const onBoardCreate = (BoardData) => {
      // BoardData: formData 객체
      dispatch(createBoardThunk(BoardData))
         .unwrap()
         .then(() => {
            navigate('/') //게시물 등록 후 메인페이지로 이동
         })
         .catch((error) => {
            console.error('게시물 등록 에러: ', error)
            alert('게시물 등록에 실패했습니다.')
         })
   }

   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <BoardCreateForm onBoardCreate={onBoardCreate} />
      </Container>
   )
}

export default BoardCreatePage
