import { Container, Typography, Pagination, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../features/boardSlice'
import BoardItem from '../components/board/BoardItem'

function Home({ isAuthenticated, member }) {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   return (
      <Container maxWidth="lg" className="main">
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
               <div style={{ border: '1px solid #03c75a', borderRadius: '5px', padding: '10px', height: '150px', display:'flex', flexDirection:'column', justifyContent: 'center' }}>
                  <AccountCircleIcon style={{ display: 'block', color: 'gray', width: '116', fontSize: '80', marginBottom:'15px' }} />
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" color="success">
                        로그인하세요.
                     </Button>
                  </Link>
               </div>
            </>
         )}

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )}

         {boards.length > 0 ? (
            <div style={{marginLeft:'20px'}}>
               <table>
                  <thead>
                     <tr style={{ display: 'flex' }}>
                        <th style={{ flex: '10%' }}>번호</th>
                        <th style={{ flex: '30%' }}>제목</th>
                        <th style={{ flex: '20%' }}>대표 이미지</th>
                        <th style={{ flex: '20%' }}>시간</th>
                        <th style={{ flex: '20%' }}>작성자</th>
                     </tr>
                  </thead>
                  <tbody>
                     {boards.map((board) => (
                        <BoardItem key={board.id} board={board} isAuthenticated={isAuthenticated} member={member} />
                     ))}
                  </tbody>
               </table>
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center', marginBottom: '20px' }}>
                  <Pagination count={pagination.totalPages} page={page} onChange={handlePageChange} />
               </Stack>
            </div>
         ) : (
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default Home
