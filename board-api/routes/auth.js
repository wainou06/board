const express = require('express')
const bcrypt = require('bcrypt') // 암호화
const Member = require('../models/member')
const router = express.Router()

// 회원가입
router.post('/join', async (req, res, next) => {
   try {
      const { email, name, password } = req.body

      const exMember = await Member.findOne({
         where: { email },
      })

      if (exMember) {
         const error = new Error('이미 사용하고 있는 이메일입니다.')
         error.status = 409
         return next(error)
      }

      const hash = await bcrypt.hash(password, 12)

      const newMember = await Member.create({
         email,
         name,
         password: hash,
      })

      res.status(201).json({
         message: '회원가입이 완료되었습니다.',
         user: {
            id: newMember.id,
            email: newMember.email,
            name: newMember.name,
         },
      })
   } catch (error) {
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

// 로그인

// 로그아웃

// 로그인 상태 확인

module.exports = router
