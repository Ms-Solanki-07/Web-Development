let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector("h3");
let newBtn = document.querySelector("#new");

let turnO = true;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const newResetGame = () => {
    turnO = true;
    msg.innerText = "Turn of Player - O"
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("btn clicked");
        if(turnO){
            box.innerText = "O";
            msg.innerText = "Turn of Player - X"
            turnO = false;
        } else {
            box.innerText = "X";
            msg.innerText = "Turn of Player - O"
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1val =  boxes[pattern[0]].innerText;
        let pos2val =  boxes[pattern[1]].innerText;
        let pos3val =  boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val);
                msg.innerText = `Congratulations 🎉🥳, Winner - ${pos1val}`
                for(box of boxes){
                    box.disabled = true;
                }
            }
        }
    }
}

newBtn.addEventListener("click", newResetGame);
resetBtn.addEventListener("click", newResetGame);
