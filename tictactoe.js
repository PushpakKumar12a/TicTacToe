let boxes = document.querySelectorAll(".check");
let resetbtn = document.querySelector(".reset");
let msg = document.querySelector(".win");

let turn0 = true;
let count = 0;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        pturn(turn0);
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            count++;
            let iswinner = checkWinner();

            if (count === 9 && !iswinner) {
                gameDraw();
            }
        }
    });
});

const pturn=(turn)=>{
    if(turn){
        msg.innerText=`<--Player-2 Chance-->`
    }else{
        msg.innerText=`<--Player-1 Chance-->`
    }
}

const resetgame = () => {
    turn0 = true;
    count = 0;
    enableboxes();
    resetbtn.innerText = "Reset";
    msg.innerText="<--Player-1 Chance-->";
};

const disableboxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const gameDraw = () => {
    msg.innerText = `<-- Game is Draw -->`;
    msg.style.visibility = "visible";
    resetbtn.innerText = "New Game";
    disableboxes();
};

const showWinner = (winner) => {
    msg.innerText = `<-- Winner is ${winner} -->`;
    resetbtn.innerText = "New Game";
    disableboxes();
};

const checkWinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

resetbtn.addEventListener("click", resetgame);
