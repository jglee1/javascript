function processData(input) {
    var lines = input.split('\n');
    
    console.log(lines);
    var botNumberStr = lines[0].split(" ");
    var botNumber = parseInt(botNumberStr[0]);
    var grid = [];
    var numofDirt = 0;
    var numOfHidden = 0;
    var MatrixDimension = [3,3];
    //test
    //console.log(MatrixDimension);
    

    for(var i = 1; i <= MatrixDimension[0]; ++i) {
            grid.push(lines[i]);
    }
    displayCleanBot(botNumber, MatrixDimension, grid);

}

function displayCleanBot(botNumber, MatrixDimension, grid) {
    // find the location of bot and dirts
    let locEscape = [];
    let locNonWall = [];
    let locWall = [];
    let locBot = [1,1];
    let locOfNonWallToMoveTo = -1;
    let result;
   
    //console.log("orientation1: " + orientation);
    
    for (let i = 0; i < MatrixDimension[0]; i++) {
        for (let j = 0; j < MatrixDimension[1]; j++) {
            if (grid[i][j] === "e") {
                locEscape.push([i,j]);
            }
            if (grid[i][j] === "-") {
                locNonWall.push([i,j]);
            }
            if (grid[i][j] === "#") {
                locWall.push([i,j]);
            } 
            
        }
    }
    
    // calculate distance and direction from bot to the closest dirt
    
    if (locNonWall.length > 0) {                        // Move to a closest NonWall.
        
        // choose NonWall to move to.
        locOfNonWallToMoveTo = selectionOfNonWall(locNonWall, locBot);   

        //console.log(locOfNonWallToMoveTo);
        
        result = directionSelector(locBot,locOfNonWallToMoveTo);

    } else {
        console.log("Completely Surrounded by Walls!");
    }
       
    //print the result

    //orientation = result;
    console.log(result);    
    //console.log("orientation2: " + orientation);
    //console.log(grid);
    
    //return gridCheck.length;
} 

// random whole number between min and max
const randomRange = (myMin, myMax) =>  Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

const directionSelector = (locBot,locOfNonWallToMoveTo) => {
    let verticalDistance = locOfNonWallToMoveTo[0]-locBot[0];
    let horizontalDistance = locOfNonWallToMoveTo[1]-locBot[1];
        
    if (verticalDistance > 0 && horizontalDistance === 0) {
        return "DOWN";
    } else if (verticalDistance < 0 && horizontalDistance === 0) {
        return "UP";
    } else if (verticalDistance === 0 && horizontalDistance > 0) {
        return "RIGHT";
    } else if (verticalDistance === 0 && horizontalDistance < 0) {
        return "LEFT";
    } else {
        console.log("Error at directionSelector");
        return "";
    }
}

const selectionOfNonWall = (locNonWall,locBot) => {
    let NonDiagonalNonWall = [];
    let countVertical = 0;
    let countHorizontal = 0; 
    for (let i = 0; i < locNonWall.length; i++) {
        let verticalDistance = locNonWall[i][0]-locBot[0];
        let horizontalDistance = locNonWall[i][1]-locBot[1];
        if (verticalDistance !== 0 && horizontalDistance === 0) {    // vertical move only.
            NonDiagonalNonWall.push(locNonWall[i]);
            countVertical += 1;
        } else if (verticalDistance === 0 && horizontalDistance !== 0) {    // horizontal move only.
            NonDiagonalNonWall.push(locNonWall[i]);
            countHorizontal += 1;
        }
    }
    //console.log(NonDiagonalNonWall);
    if (countVertical === 2) {      // open "UP" and "DOWN"
        chooseNonWall = randomRange(0,1);       
    } else if (countHorizontal === 2) {    // open "RIGHT" and "LEFT"
        chooseNonWall = randomRange(0,1) + countVertical; 
    } else {
        chooseNonWall = randomRange(0, NonDiagonalNonWall.length - 1);
    }
    
    return NonDiagonalNonWall[chooseNonWall];
}   


process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});


