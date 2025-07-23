// Comment.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Divider } from '@mui/material'

function Comment() {
   const { id } = useParams()
   const [comments, setComments] = useState([])

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/comment/${id}`)
            setComments(res.data.comments)
         } catch (error) {
            console.error('댓글 불러오기 실패:', error.message)
         }
      }

      fetchComments()
   }, [id])

   return (
      <Box sx={{ width: 900, margin: '0 auto', mt: 2 }}>
         <Typography variant="h6" gutterBottom>
            댓글 {comments.length}개
         </Typography>
         {comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Typography>작성자: {comment.User && comment.User?.name}</Typography>
               <Typography variant="body1">{comment.content}</Typography>
               <Typography color="text.secondary" style={{ textAlign: 'right' }}>
                  작성일: {new Date(comment.createdAt).toLocaleString()}
               </Typography>
            </Box>
         ))}
      </Box>
   )
}

export default Comment
