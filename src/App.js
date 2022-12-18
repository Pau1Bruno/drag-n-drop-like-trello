import './App.css'
import {useState} from "react";

function App() {
    const [boards, setBoards] = useState([
        // {id: 1, title: 'Сделать', items: [{id: 1, title: 'Посадить деревья'}, {id: 2, title: 'Доебаться до Лизы'}, {id: 3, title: 'Посмотреть аниме'}]},
        // {id: 2, title: 'Проверить', items: [{id: 1, title: 'Контрольная матан'}, {id: 2, title: 'Контрольная по диффурам'}, {id: 3, title: 'Контрольная ТФКП'}]},
        // {id: 3, title: 'Выполнено', items: [{id: 1, title: 'Дз матан'}, {id: 2, title: 'Дз ТФКП'}, {id: 3, title: 'Числаки'}]},
        {id: 1, title: 'Сделать', items: [{id: 1, title: 'C1'}, {id: 2, title: 'C2'}, {id: 3, title: 'C3'}]},
        {id: 2, title: 'Проверить', items: [{id: 1, title: 'П1'}, {id: 2, title: 'П2'}, {id: 3, title: 'П3'}]},
        {id: 3, title: 'Выполнено', items: [{id: 1, title: 'В1'}, {id: 2, title: 'В2'}, {id: 3, title: 'В3'}]},
    ]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray';
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none';
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
        console.log('board: ', board, 'item: ', item);
    }

    function dragEndHandler(e) {

    }

    function dropHandler(e, board, item) {
        e.preventDefault();
        console.log('board: ', board, 'item: ', item);
        e.target.style.boxShadow = 'none';

        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
        e.stopPropagation();
    }

    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }));
    }

    return (
        <div className="App">
            {boards.map(board =>
                <div
                    className='board'
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => dropCardHandler(e, board)}
                >
                    <div className="board__title">
                        {board.title}
                    </div>
                    {board.items.map(item =>
                        <div className='item'
                             onDragOver={e => dragOverHandler(e)}
                             onDragLeave={e => dragLeaveHandler(e)}
                             onDragStart={e => dragStartHandler(e, board, item)}
                             onDragEnd={e => dragEndHandler(e)}
                             onDrop={e => dropHandler(e, board, item)}
                             draggable={true}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
