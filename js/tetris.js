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
        fullGameMap = [],           // array (eilutes) of occupancy (stulpeliu)
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
        nextFigureIndex = -1,
        currentFigure = {
            index: 0,
            position: {
                x: 4,
                y: 0
            },
            canControl: true,
            canMoveDown: true
        };

    // cache DOM
    var game = document.querySelector('#tetris'),
            boardContainer = game.querySelector('.board-container'),
                gameBoard = boardContainer.querySelector('.board'),
                    boardBackground = gameBoard.querySelector('.background'),
                    boardFigures = gameBoard.querySelector('.figure-layer'),
                    boardActiveFigure = gameBoard.querySelector('.active-figure'),
                        activeFigure = boardActiveFigure.querySelector('.figure'),
            start = game.querySelector('.btn');

    // init
    board.size.width = parseInt( getComputedStyle( boardContainer ).width );
    board.size.height = parseInt( getComputedStyle( boardContainer ).height );
    renderBackground();
    resetFullGameMap();
    
    
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
        gameBoard.style.height = board.cells.y * cellSize + 'px';
        return boardBackground.innerHTML = HTML;
    }

    function resetFullGameMap() {
        for ( let e=0; e<board.cells.y; e++ ) {
            fullGameMap.push([]);
            for ( let s=0; s<board.cells.x; s++ ) {
                fullGameMap[e].push(0);
            }
        }
        
        return;
    }

    function startGame() {
        if ( gameState === 'running' ) {
            gameState = 'paused';
            clearInterval(gameClock);
            return;
        }

        selectNextFigure();
        addNewFigureToScreen();
        gameState = 'running';

        gameClock = setInterval(()=>{
            figureProcess();

            if ( gameState !== 'running' ) {
                clearInterval(gameClock);
            }
        }, 500);

        return;
    }

    function selectNextFigure() {
        if ( nextFigureIndex >= 0 ) {
            return;
        }
        return nextFigureIndex = Math.floor( Math.random() * figures.length );
    }

    function figureProcess() {
        if ( gameState !== 'running' ) {
            return;
        }
        
        if ( canCurrentFigureMoveDown() ) {
            currentFigure.position.y++;
            activeFigure.style.marginTop = currentFigure.position.y * board.cells.cellSize + 'px';
        } else {
            currentFigure.index = nextFigureIndex;
            nextFigureIndex = -1;
            selectNextFigure();
            addNewFigureToScreen();
        }

        // ar einamoji figura gali dar judeti zemyn
            // taip
                // einamoji figura nusileidzia per liena linija zemyn
            // ne, nes ji pasieke dugna
                // reikia naujos sekancios figuros
                // pries tai isrinkta figura pradedame judinti
                    // ja pastatome virsuje per viduri
                    // leidziame figurai kristi zemyn
                    // kartojame procesa???

        return;
    }

    function canCurrentFigureMoveDown() {
        var can = true;

        // ieskome priezasciu, kodel figura negale kristi zemiau
            // pasieke dugna
            // susiliete su kita figura apaciomis
        
        // ar pasieke dugna?
        if ( board.cells.y - figures[ currentFigure.index ].map.length === currentFigure.position.y ) {
            can = false;
        }

        return can;
    }

    function addNewFigureToScreen() {
        // currentFigure kintamojo panaudojimas
        currentFigure = {
            index: nextFigureIndex,
            position: {
                x: 4,
                y: 0
            },
            canControl: true,
            canMoveDown: true
        };

        boardActiveFigure.innerHTML = generateNewFigure();
        activeFigure = boardActiveFigure.querySelector('.figure');

        return;
    }

    function generateNewFigure() {
        let cellSize = board.cells.cellSize,
            f = figures[nextFigureIndex].map,
            figureWidth = f[0].length * cellSize + 'px',
            figureHeight = f.length * cellSize + 'px',
            HTML = `<div class="figure figure-${figures[nextFigureIndex].name}" style="width: ${figureWidth}; height: ${figureHeight}; margin-left: ${currentFigure.position.x * cellSize}px; margin-top: ${currentFigure.position.y * cellSize}px;">`;
        
        f.forEach( figureRow => {
            figureRow.forEach( figureCell => {
                HTML += `<div class="figure-cell ${ figureCell === 0 ? 'figure-empty-cell' : ''}" style="width: ${cellSize}px; height: ${cellSize}px;"></div>`;
            });
        });
        HTML += '</div>';
        return HTML;
    }


    // access points

})();
