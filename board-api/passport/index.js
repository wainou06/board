const passport = require('passport')
const local = require('./localStrategy')
const Member = require('../models/member')

module.exports = () => {
   passport.serializeUser((member, done) => {
      console.log('member: ', member)
      done(null, member.id)
   })

   passport.deserializeUser((id, done) => {
      Member.findOne({
         where: { id },
         attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      })
         .then((member) => done(null, member)) // 성공시 가져온 사용자 객체 정보를 반환
         .catch((err) => done(err)) // 에러 발생시 에러 반환
   })

   local() //localStrategy.js에서 export된 함수를 passport에 추가
}
