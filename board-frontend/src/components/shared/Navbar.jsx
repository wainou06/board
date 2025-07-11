import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link } from 'react-router-dom'

function Navbar() {
   return (
      <AppBar position="static" style={{ backgroundColor: '#03c75a' }}>
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Link to="/">
                  <img src="/images/NaverBrand_Logotype.png" alt="로고" width="160" style={{ display: 'inline-block', margin: '15px 0 10px' }} />
               </Link>
            </Typography>
            <Link to="/login">
               <Button variant="contained" color="success">
                  로그인
               </Button>
            </Link>
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
