const cells = document.querySelectorAll('.cell');
let flag = false;

let board = Array(9).fill(null);
let gameOver = false;
let myturn = document.getElementById("myturn");
cells.forEach((cell , index) => {
    cell.addEventListener('click', () => {

        if(gameOver || board[index]) return;
        if(flag){
            board[index] = "O";
            flag = false;
            myturn.innerHTML = "X's Turn";
        }
        else{
            board[index] = "X";
            flag = true;
            myturn.innerHTML = "O's Turn";
        }
        cell.innerHTML = board[index];
        
        const winningpattern = checkwinner();

        if(winningpattern){
            gameOver = true;
            winningpattern.forEach(index => {
                cells[index].style.background = "green";
            });
            setTimeout(() => {
                alert(board[winningpattern[0]] + " Wins");
            }, 100);
        }
        else if(!winningpattern && nullcell()){
            gameOver = true;
            myturn.innerHTML = "None Wins"
        }
    });
});
function checkwinner(){
    const winnerPattern = [
        [0,1,2] , [3,4,5] , [6,7,8],
        [0,3,6] , [1,4,7] , [2,5,8],
        [0,4,8] , [2,4,6]
    ];
    for(let pattern of winnerPattern){
        let [a, b, c] = pattern;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return pattern;
        }
    }
    return null;
}
function nullcell(){
    for(let cell of cells){
        if(cell.innerHTML === ""){
            return false;
        }
    }
    return true;
}
const reset = document.getElementById("reset");
reset.addEventListener('click' , function(){
    board.fill(null);  
    gameOver = false;  
    flag = false; 
    myturn.innerHTML = "X's Turn";

    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
    });
});