"use strict";

var tetris = (function(){
    var board = {
            size: {
                width: 0,
                height: 0
            },
            cells: {
                x: 11,
                y: 20,
                cellSize: 1
            }
        },
        gameState = 'stopped',      // running, stopped, pause
        gameClock,
        figures = [
            {
                name: 'o',
                color: 'yellow',
                map: [
                    [1, 1],
                    [1, 1]
                ]
            },
            {
                name: 'i',
                color: 'aqua',
                map: [
                    [1, 1, 1, 1]
                ]
            },
            {
                name: 't',
                color: 'violet',
                map: [
                    [0, 1, 0],
                    [1, 1, 1]
                ]
            },
            {
                name: 'j',
                color: 'orange',
                map: [
                    [0, 0, 1],
                    [1, 1, 1]
                ]
            },
            {
                name: 'l',
                color: 'blue',
                map: [
                    [1, 0, 0],
                    [1, 1, 1]
                ]
            },
            {
                name: 's',
                color: 'green',
                map: [
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            },
            {
                name: 'z',
                color: 'red',
                map: [
                    [1, 1, 0],
                    [0, 1, 1]
                ]
            }
        ],
        nextFigure = 0;

    // cache DOM
    var game = document.querySelector('#tetris'),
            boardContainer = game.querySelector('.board-container'),
                gameBoard = boardContainer.querySelector('.board'),
                    boardBackground = gameBoard.querySelector('.background'),
                    boardFigures = gameBoard.querySelector('.figures-layer'),
            start = game.querySelector('.btn');

    // init
    board.size.width = parseInt( getComputedStyle( boardContainer ).width );
    board.size.height = parseInt( getComputedStyle( boardContainer ).height );
    renderBackground();
    
    
    // events
    start.addEventListener('click', startGame);

    // methods
    function renderBackground() {
        let maxCellWidth = Math.floor(board.size.width / board.cells.x),
            maxCellHeight = Math.floor(board.size.height / board.cells.y),
            cellSize = 0;
        
        board.cells.cellSize = maxCellWidth;
        cellSize = maxCellWidth;
        if ( maxCellWidth > maxCellHeight ) {
            board.cells.cellSize = maxCellHeight;
            cellSize = maxCellHeight;
        }
        
        let HTML = '';
        for ( let i=0; i<board.cells.x*board.cells.y; i++ ) {
            HTML += `<div class="cell" style="width: ${cellSize}px; height: ${cellSize}px;"></div>`;
        }
        gameBoard.style.width = board.cells.x * cellSize + 'px';
        return boardBackground.innerHTML = HTML;
    }

    function startGame() {
        if ( gameState === 'running' ) {
            gameState = 'paused';
            clearInterval(gameClock);
            return;
        }

        selectNextFigure();
        gameState = 'running';

        gameClock = setInterval(()=>{
            figureProcess();

            if ( gameState !== 'running' ) {
                clearInterval(gameClock);
            }
        }, 1000);
        

        return;
    }

    function selectNextFigure() {
        return nextFigure = Math.floor( Math.random() * figures.length );
    }

    function figureProcess() {
        if ( gameState !== 'running' ) {
            return;
        }

        console.log( gameState );
        

        // ar figura jau sugeneruota
            // taip ir ji juda zemyn
                // ok, tesiam...
            // ne, nes ji pasieke dugna arba yra pati pirma zaidime
                // reikia naujos sekancios figuros
                // pries tai isrinkta figura pradedame judinti
                    // ja pastatome virsuje per viduri
                    // leidziame figurai kristi zemyn
                    // kartojame procesa???

        return;
    }


    // access points

})();
