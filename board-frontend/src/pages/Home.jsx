import { Container, Typography, Pagination, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Link } from 'react-router-dom'

function Home({ isAuthenticated, member }) {
   return (
      <Container maxWidth="xl">
         {isAuthenticated ? (
            <>
               <div style={{ border: '1px solid #03c75a' }}>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" style={{ color: 'black' }}>
                        {member?.name}님
                     </Typography>
                  </Link>
                  <Link to="/posts/create">
                     <IconButton aria-label="글쓰기">
                        <CreateIcon />
                     </IconButton>
                  </Link>
               </div>
            </>
         ) : (
            <>
               <div style={{ border: '1px solid #03c75a', borderRadius: '5px', float: 'left', padding: '10px' }}>
                  <AccountCircleIcon style={{ display: 'block', color: 'gray', width: '116', fontSize: '80' }} />
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" color="success">
                        로그인하세요.
                     </Button>
                  </Link>
               </div>
            </>
         )}

         {/*   {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )} */}

         {/*  {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )} */}
      </Container>
   )
}

export default Home
