const express = require('express')
const { sequelize } = require('./models')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 데이터 베이스 연결 설정
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(`데이터베이스 연결 실패: ${err}`)
   })

//공통 미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads'))) // 정적 파일 제공
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//에러처리 미들웨어
app.use((req, res, next) => {
   //요청 경로에 해당하는 라우터가 없을때
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404 //404: not found
   next(error) //다음 에러처리 미들웨어로 이동
})

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버 에러'

   // 에러 정보를 브라우저로 전달
   res.status(status).send(`
      <h1>Error ${status}</h1>
      <p>${message}</p>
   `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
