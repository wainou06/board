const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Member, Board } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// uploads 폴더 생성
try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads 폴더가 없어 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

// 이미지 업로드
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)

         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

// 게시물 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      console.log('파일정보:', req.file)
      console.log('formData:', req.body)

      if (!req.file) {
         const error = new Error('파일 업로드에 실패했습니다.')
         error.status = 400
         return next(error)
      }

      const board = await Board.create({
         title: req.body.title,
         content: req.body.content,
         img: `/${req.file.filename}`,
         member_id: req.user.id,
      })

      res.status(200).json({
         success: true,
         board: {
            id: board.id,
            title: board.title,
            img: board.img,
            memberId: board.member_id,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 등록 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 수정
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      // 게시물 확인
      const board = await Board.findOne({
         where: { id: req.params.id, member_id: req.user.id },
      })
      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      // board 테이블 수정
      await board.update({
         title: req.body.title,
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : board.img,
      })

      // 수정된 게시물
      const updateBoard = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
         ],
      })

      // 수정 성공
      res.status(200).json({
         success: true,
         board: updateBoard,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 수정 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
      // 게시물 확인
      const board = await Board.findOne({
         where: { id: req.params.id, member_id: req.user.id },
      })

      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      // board 삭제
      await board.destroy()

      res.status(200).json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

// 특정 게시물 불러오기
router.get('/:id', async (req, res, next) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
         ],
      })

      // 게시물 불러오지 못함
      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      // 성공
      res.status(200).json({
         success: true,
         board,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '특정 게시물을 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

// 전체 게시물
router.get('/', async (req, res, next) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 5 // 한페이지당 나타낼 게시물 수
      const offset = (page - 1) * limit // 오프셋 계산

      const count = await Board.count()

      const boards = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
      })

      console.log('boards: ', boards)

      res.status(200).json({
         success: true,
         boards,
         pagination: {
            totalBoards: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 리스트를 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
