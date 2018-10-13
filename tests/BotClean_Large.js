function processData(input) {
    var lines = input.split('\n');
    var botPositionStr = lines[0].split(" ");
    var botPosition = [parseInt(botPositionStr[0]), parseInt(botPositionStr[1])];
    var MatrixDimentionStr = lines[1].split(" ");
    var MatrixDimention = [parseInt(MatrixDimentionStr[0]), parseInt(MatrixDimentionStr[1])];
    var grid = [];
    //test
    //console.log(MatrixDimention);
    for(var i = 2; i <= MatrixDimention[0]+1; ++i)
    {
        grid.push(lines[i]);
    }
    displayCleanBot(botPosition, MatrixDimention, grid);
}

function displayCleanBot(botPosition, MatrixDimention, grid) {
    // find the location of bot and dirts
    let locDirt = [];
    let locBot = botPosition;
    let locOfDirtWithBot = -1;   // location of a dirt with bot in the array of locDirt.
    let locOfClosestDirtInArray = -1;
    let result;
 
    for (let i = 0; i < MatrixDimention[0]; i++) {
        for (let j = 0; j < MatrixDimention[1]; j++) {
            if (grid[i][j] === "d") {
                locDirt.push([i,j]);
            }
        }
    }

    // check if bot is on a dirt
    for (let i = 0; i < locDirt.length; i++) {
        if (locBot[0] === locDirt[i][0] && locBot[1] === locDirt[i][1]) {
            locOfDirtWithBot = i;     // bot is on a dirt in the i'th location of locDirt array.
        }
    }
        
    // calculate distance and direction from bot to the closest dirt
    
    let locClosestDirt = [];
    let shortestDistance = 100000000;
    
    // find the location of the closest dirt from bot
    if (locOfDirtWithBot >= 0) {      // if bot is on a dirt
        locOfClosestDirtInArray = locOfDirtWithBot;
        shortestDistance = 0;
        locClosestDirt = locDirt[locOfDirtWithBot];
        result = "CLEAN";
        
    } else {                        // if bot is not on a dirt
        for (let i = 0; i < locDirt.length; i++) {
            let distance = Math.abs(locDirt[i][0]-locBot[0]) + Math.abs(locDirt[i][1]-locBot[1]);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                locClosestDirt = locDirt[i];
            }
        }
    
        let verticalDistance = Math.abs(locClosestDirt[0]-locBot[0]);
        let horizontalDistance = Math.abs(locClosestDirt[1]-locBot[1]);
    
        let verticalDirection = (locClosestDirt[0]-locBot[0] > 0 ) ? "DOWN" : "UP";
        let horizontalDirection = (locClosestDirt[1]-locBot[1] > 0 ) ? "RIGHT" : "LEFT";

        if (horizontalDistance >= verticalDistance) {
            result = horizontalDirection;
        } else {
            result =verticalDirection;
        }
    }
            
    //print the result    
    console.log(result);
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