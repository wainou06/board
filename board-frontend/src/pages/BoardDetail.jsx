import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBoardByIdThunk } from '../features/boardSlice'
import { Link } from 'react-router-dom'

import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'

function BoardDetail({ isAuthenticated, member }) {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()
   const { board, loading } = useSelector((state) => state.boards)
   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   // 목록 버튼 누를 시 '/'로 이동
   const onClick = () => {
      navigate('/')
   }

   if (loading) return <p>로딩 중...</p>
   return (
      <>
         {board && (
            <div className="board_table">
               <div className="board_wrap">
                  <div className="board_title">
                     <b>제목</b> {board.title}
                  </div>
                  <div className="board_content">
                     <img src={`${import.meta.env.VITE_BOARD_API_URL}${board.img}`} alt={board.title} width="300" />
                     <div>{board.content}</div>
                  </div>
               </div>
               <div className='buttons'>
                  <Button variant="contained" color="success">
                     목록
                  </Button>
                  {isAuthenticated && board.Member.id === member.id && (
                     <Box sx={{ p: 1 }}>
                        <Link to={`/boards/edit/${board.id}`}>
                           <IconButton aria-label="edit" size="small">
                              <EditIcon fontSize="small" />
                           </IconButton>
                        </Link>
                        <IconButton aria-label="delete" size="small">
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </Box>
                  )}
               </div>
            </div>
         )}
      </>
   )
}

export default BoardDetail
