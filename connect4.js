/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //creates empty arrays x height
  for(let y = 0; y < HEIGHT; y++){
    board.push([]);
  }
  //adds y(WIDTH element) to each empty array(HEIGHT)
  return board.map((arr, idx) => {
    for(let x = 0; x < WIDTH; x++){
     arr.push(0) 
   } 
  })

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board")
  console.log(htmlBoard);
  // TODO: creates a table row that you can click on and delivers the callback handleClick
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);


  // this creates table data and sets the id attribute to x
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //adds to htmlboard
  htmlBoard.append(top);

  // creates table dynamically with height and width
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);

      row.append(cell);
    }
    htmlBoard.append(row);
  }
}



/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let circlePiece = createCirclePiece();
 

  let toBeFill = document.getElementById(`${y}-${x}`)
  toBeFill.appendChild(circlePiece);
  board[y][x] = null;

}

function createCirclePiece(){
  let circlePiece = document.createElement("div");
  circlePiece.classList.add("piece");
  
  if (currPlayer === 1){
    circlePiece.classList.add("player-one");
  }else if (currPlayer === 2){
    circlePiece.classList.add("player-two");
  }
  currPlayer = (currPlayer === 1) ? 2 : 1;

  return circlePiece;

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // takes x from event click and then changes it into y
    let y = board.length - 1; 
    while(board[y][x] === null){
      y--;
    }
    // while(board[y][x] == "p1" || board[y][x] == "p1"){
    //   console.log("woot")
    //   y--;
    // }

  return y;

}
/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  // if (y === null) {
  //  return y - 1;
  // }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
