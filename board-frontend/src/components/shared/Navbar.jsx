import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'

function Navbar({ isAuthenticated, member }) {
   const dispatch = useDispatch()
   const navigator = useNavigate()

   // 로그아웃 버튼을 눌렀을때 로그아웃
   const handleLogout = () => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigator('/') //로그아웃 완료 후 메인페이지로 이동
         })
         .catch((error) => {
            alert('로그아웃 실패:', error)
         })
   }
   return (
      <AppBar
         position="static"
         style={{
            backgroundColor: '#03c75a',
            marginBottom: 50,
         }}
      >
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Link to="/">
                  <img src="/images/logo.png" alt="로고" width="160" style={{ display: 'inline-block', margin: '15px 0 10px' }} />
               </Link>
            </Typography>
            {isAuthenticated ? (
               <>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                        {member?.name}님
                     </Typography>
                  </Link>
                  <Button onClick={handleLogout} variant="outlined" color="white">
                     로그아웃
                  </Button>
               </>
            ) : (
               <Link to="/login">
                  <Button variant="contained" color="success">
                     로그인
                  </Button>
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
