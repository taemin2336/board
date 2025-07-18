import { Link } from 'react-router-dom'
function Board({ board }) {
   return (
      <>
         <Link to={`/boards/detail/${board.id}`}>{board.title}</Link>
      </>
   )
}

export default Board
