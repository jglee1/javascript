var orientation = "UP";  //global variable

function processData(input) {
    var lines = input.split('\n');
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
    let resultBeforeOrientationAdjustment;
    let result;
   
    console.log("orientation: " + orientation);
    
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
        
        resultBeforeOrientationAdjustment = directionSelector(locBot,locOfNonWallToMoveTo);
        result = orientationAdjustor(resultBeforeOrientationAdjustment);

    } else {
        console.log("Completely Surrounded by Walls!");
    }
       
    //print the result
    if (botNumber === 1) {

        console.log(result);    
        console.log("orientation: " + orientation);
    }
    
    //return gridCheck.length;
} 

const findIndexOfElementInDoubleArray = (gridCheck, [a,b]) => {
    for (let i = 0; i < gridCheck.length; i++) {
        if (gridCheck[i][0] === a && gridCheck[i][1] === b) {
            return i;
        }
    }
    return -1;
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
    for (let i = 0; i < locNonWall.length; i++) {
        let verticalDistance = locNonWall[i][0]-locBot[0];
        let horizontalDistance = locNonWall[i][1]-locBot[1];
        if (verticalDistance !== 0 && horizontalDistance === 0) {    // vertical move only.
            NonDiagonalNonWall.push(locNonWall[i]);
        } else if (verticalDistance === 0 && horizontalDistance !== 0) {    // horizontal move only.
            NonDiagonalNonWall.push(locNonWall[i]);      
        }
    }
    //console.log(NonDiagonalNonWall);
    let chooseNonWall = randomRange(0, NonDiagonalNonWall.length - 1);
    return NonDiagonalNonWall[chooseNonWall];
}   

const orientationAdjustor = (resultBeforeOrientationAdjustment) => {
    standardOrientation = ["UP", "RIGHT", "DOWN", "LEFT"];
    let locBefore = standardOrientation.indexOf(resultBeforeOrientationAdjustment);

    if (orientation === "UP") {
        return resultBeforeOrientationAdjustment;
    } else if (orientation == "RIGHT") {
        let adjustment = 1;
        let newLoc = (locBefore + adjustment ) % standardOrientation.length;
        return standardOrientation[newLoc];
    } else if (orientation == "DOWN") {
        let adjustment = 2;
        let newLoc = (locBefore + adjustment ) % standardOrientation.length;
        return standardOrientation[newLoc];
    } else if (orientation == "LEFT") {
        let adjustment = 3;
        let newLoc = (locBefore + adjustment ) % standardOrientation.length;
        return standardOrientation[newLoc];
    } else {
        return "ERROR at orientationAdjustor";
    }
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


process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
