const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const { User } = require('../models')

// 댓글 등록
router.post('/', async (req, res, next) => {
   try {
      console.log(req.body)
      console.log(123123)
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
      const comments = await Comment.findAll({
         where: { board_id: req.params.id },

         include: [
            {
               model: User,
               attributes: ['id', 'name'],
            },
         ],
         order: [['createdAt', 'DESC']],
      })

      res.status(200).json({
         success: true,
         comments,
         message: '댓글 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      next(error)
   }
})

module.exports = router
