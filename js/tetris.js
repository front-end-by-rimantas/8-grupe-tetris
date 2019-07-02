"use strict";

var tetris = (function(){
    var board = {
            size: {
                width: 0,
                height: 0
            },
            cells: {
                x: 11,
                y: 20
            }
        };

    // cache DOM
    var game = document.querySelector('#tetris'),
            boardContainer = game.querySelector('.board-container'),
                gameBoard = boardContainer.querySelector('.board'),
                    boardBackground = gameBoard.querySelector('.background'),
                    boardFigures = gameBoard.querySelector('.figures-layer');

    // init
    board.size.width = parseInt( getComputedStyle( boardContainer ).width );
    board.size.height = parseInt( getComputedStyle( boardContainer ).height );
    renderBackground();
    
    
    // events


    // methods
    function renderBackground() {
        let maxCellWidth = Math.floor(board.size.width / board.cells.x),
            maxCellHeight = Math.floor(board.size.height / board.cells.y),
            cellSize = maxCellWidth;
        
        if ( maxCellWidth > maxCellHeight ) {
            cellSize = maxCellHeight;
        }
        
        let HTML = '';
        for ( let i=0; i<board.cells.x*board.cells.y; i++ ) {
            HTML += `<div class="cell" style="width: ${cellSize}px; height: ${cellSize}px;"></div>`;
        }
        gameBoard.style.width = board.cells.x * cellSize + 'px';
        return boardBackground.innerHTML = HTML;
    }


    // access points

})();
