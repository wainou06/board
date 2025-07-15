import { Container } from '@mui/material'
import BoardCreateForm from '../components/board/BoardCreateForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBoardThunk } from '../features/boardSlice'

function BoardCreatePage() {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const onBoardCreate = (boardData) => {
      dispatch(createBoardThunk(boardData))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            console.error('게시물 등록 에러: ', error)
            alert('게시물 등록에 실패했습니다.', error)
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
