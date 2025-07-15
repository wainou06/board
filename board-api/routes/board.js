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

module.exports = router
