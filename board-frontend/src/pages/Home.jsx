import { Container, Typography, Pagination, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Link } from 'react-router-dom'

function Home({ isAuthenticated, member }) {
   return (
      <Container maxWidth="lg">
         {isAuthenticated ? (
            <>
               <div style={{ border: '1px solid #03c75a', borderRadius: '5px', float: 'left', padding: '10px' }}>
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
      </Container>
   )
}

export default Home
