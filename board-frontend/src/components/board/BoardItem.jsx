import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBoardThunk, fetchBoardsThunk } from '../../features/boardSlice'

function BoardItem({ board, isAuthenticated, member, currentPage }) {
   const dispatch = useDispatch()

   // 게시물 삭제
   const onClickDelete = (id) => {
      const result = confirm('정말 삭제하시겠습니까?')
      if (result) {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               // 삭제 후 현재 페이지 기준으로 다시 목록 불러오기
               dispatch(fetchBoardsThunk(currentPage))
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다.' + error)
            })
      }
   }

   return (
      <tr style={{ display: 'flex' }}>
         <td style={{ flex: '10%' }}>{board.id}</td>

         <td style={{ flex: '30%' }}>
            <Link to={`/detail/${board.id}`}>{board.title}</Link>
         </td>
         <td style={{ flex: '20%' }}>
            <Link to={`/detail/${board.id}`}>
               <img src={`${import.meta.env.VITE_BOARD_API_URL}${board.img}`} alt={board.title} style={{ width: 120, height: 120, borderRadius: 15 }} />
            </Link>
         </td>
         <td style={{ flex: '20%' }}>{dayjs(board.createAt).format('YY/MM/DD HH:mm')}</td>
         <td style={{ flex: '20%' }}>
            <Link to={`/my/${board.Member.id}`}>{board.Member.name}</Link>
            {isAuthenticated && board.Member.id === member.id && (
               <Box sx={{ p: 1 }}>
                  <Link to={`/boards/edit/${board.id}`}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(board.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </td>
      </tr>
   )
}

export default BoardItem
