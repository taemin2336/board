const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

// 댓글 등록
router.post('/', async (req, res, next) => {
   try {
      console.log(req.body)
      console.log(123123)
      // const board = await Comment.create({
      //    content: req.body.comment,
      //    board_id: req.body.id,
      // })
      const { comment, board_id, user_id } = req.body
      const newComment = await Comment.create({
         content: comment,
         board_id,
         user_id,
      })
      res.status(201).json({ success: true, comment: newComment, message: '댓글 등록 성공' })
   } catch (error) {
      next(error)
   }
})

// 특정 댓글 불러오기(id로 게시물 조회) localhost:8000/comment/:id
router.get('/:id', async (req, res, next) => {
   try {
      const comment = await Comment.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Board,
               attributes: ['id', 'title'],
            },
         ],
      })

      // 댓글 가져오지 못했을때
      if (!comment) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      res.status(200).json({
         success: true,
         comment,
         message: '댓글을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '댓글을 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
