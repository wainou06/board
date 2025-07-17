import { Container } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardByIdThunk, updateBoardThunk } from '../features/boardSlice'
import { useEffect } from 'react'
import BoardEditForm from '../components/board/BoardEditForm'

function BoardEditPage() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()
   const { board, loading } = useSelector((state) => state.boards)

   // 데이터 불러오기
   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   // 수정
   const onBoardEdit = (boardData) => {
      dispatch(updateBoardThunk({ id, boardData }))
         .unwrap()
         .then(() => {
            navigate(`/detail/${board.id}`)
         })
         .catch((error) => {
            console.error('게시물 수정 중 오류 발생: ', error)
            alert('게시물 수정에 실패했습니다.' + error)
         })
   }

   if (loading) return <p>로딩 중...</p>

   return (
      <Container maxWidth="md">
         <h1>게시물 수정</h1>
         {board && <BoardEditForm onBoardEdit={onBoardEdit} initialValues={board} />}
      </Container>
   )
}

export default BoardEditPage
