import { Container, Typography, Pagination, Stack } from '@mui/material'
import Board from '../components/Board/Board'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../features/boardSlice'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function BoardList({ isAuthenticated, user }) {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page)) // 전체 게시물 리스트 가져오기
   }, [dispatch, page])

   // 페이지 변경
   const handlePageChange = (event, value) => {
      setPage(value)
   }

   // mui 테이블
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: theme.palette.common.black,
         color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
      },
   }))

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
         border: 0,
      },
   }))

   return (
      <Container>
         <Typography variant="h4" align="center" gutterBottom>
            Board
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )}

         {boards.length > 0 ? (
            <>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                     <TableHead>
                        <TableRow style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 2fr' }}>
                           <StyledTableCell>No1</StyledTableCell>
                           <StyledTableCell>제목</StyledTableCell>
                           <StyledTableCell>이름</StyledTableCell>
                           <StyledTableCell>작성 시간</StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {boards.map((board) => (
                           <StyledTableRow key={board.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 2fr' }}>
                              <StyledTableCell>{board.id}</StyledTableCell>
                              <StyledTableCell>
                                 <Board board={board} isAuthenticated={isAuthenticated} user={user} />
                              </StyledTableCell>
                              <StyledTableCell>{board.User.name}</StyledTableCell>
                              <StyledTableCell>{dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                           </StyledTableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>

               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지 수
                     page={page} // 현재 페이지
                     onChange={handlePageChange} // 페이지를 변경할 함수
                  />
               </Stack>
            </>
         ) : (
            // boards 데이터가 0개 이면서 로딩중이 아닐때
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default BoardList
