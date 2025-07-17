import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBoardByIdThunk } from '../features/boardSlice'
import { Link } from 'react-router-dom'

import { Box, IconButton, Container, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
      <Container maxWidth="lg" className="detail">
         {isAuthenticated ? (
            <>
               <div style={{ border: '1px solid #03c75a', borderRadius: '5px', padding: '10px', height: '150px' }}>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <AccountCircleIcon style={{ display: 'block', color: '#03c75a', width: '116', fontSize: '80' }} />
                  </Link>
                  <Typography variant="body1" style={{ color: 'black', textAlign: 'center' }}>
                     {member?.name}님
                  </Typography>
                  <Link to="/boards/create" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                     <p style={{ color: 'black' }}>글쓰기</p>
                     <IconButton aria-label="글쓰기">
                        <CreateIcon />
                     </IconButton>
                  </Link>
               </div>
            </>
         ) : (
            <>
               <div style={{ border: '1px solid #03c75a', borderRadius: '5px', padding: '10px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <AccountCircleIcon style={{ display: 'block', color: 'gray', width: '116', fontSize: '80', marginBottom: '15px' }} />
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" color="success">
                        로그인하세요.
                     </Button>
                  </Link>
               </div>
            </>
         )}
         {board && (
            <>
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
                  <div className="buttons">
                     <Button variant="contained" color="success" onClick={onClick}>
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
            </>
         )}
      </Container>
   )
}

export default BoardDetail
