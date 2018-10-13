function processData(input) {
    var lines = input.split('\n');
    var botPositionStr = lines[0].split(" ");
    var botPosition = [parseInt(botPositionStr[0]), parseInt(botPositionStr[1])];
    var MatrixDimensionStr = lines[1];
    var MatrixDimension = [MatrixDimensionStr.length,MatrixDimensionStr.length] ; //[parseInt(MatrixDimentionStr[0]), parseInt(MatrixDimentionStr[1])];
    var grid = [];
    var numofDirt = 0;
    var numOfHidden = 0;

    //test
    //console.log(MatrixDimension);
    

    for(var i = 1; i <= MatrixDimension[0]; ++i) {
            grid.push(lines[i]);
    }
    displayCleanBot(botPosition, MatrixDimension, grid);

}

function displayCleanBot(botPosition, MatrixDimension, grid) {
    // find the location of bot and dirts
    let locDirt = [];
    let locHidden = [];
    let locBot = botPosition;
    let locOfDirtWithBot = -1;   // location of a dirt with bot in the array of locDirt.
    let locOfClosestDirtInArray = -1;
    let result;
   
    for (let i = 0; i < MatrixDimension[0]; i++) {
        for (let j = 0; j < MatrixDimension[1]; j++) {
            if (grid[i][j] === "d") {
                locDirt.push([i,j]);
            }
            if (grid[i][j] === "o") {
                locHidden.push([i,j]);
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
    let locLongestHiddenNotVisited = [];
    
    // find the location of the closest dirt from bot
    if (locOfDirtWithBot >= 0) {      // if bot is on a dirt
        locOfClosestDirtInArray = locOfDirtWithBot;
        shortestDistance = 0;
        locClosestDirt = locDirt[locOfDirtWithBot];
        result = "CLEAN";
        //locDirt.splice(locOfDirtWithBot,1);
        
    } else if (locDirt.length > 0) {                        // if bot is not on a dirt. Move to a closest dirt.
        
        // when there is a dirt
        let shortestDistance = 100000000;
        for (let i = 0; i < locDirt.length; i++) {
            let distance = Math.abs(locDirt[i][0]-locBot[0]) + Math.abs(locDirt[i][1]-locBot[1]);
            if (distance <= shortestDistance) {
                shortestDistance = distance;
                locClosestDirt = locDirt[i];
            }
        }
    
        let verticalDistance = Math.abs(locClosestDirt[0]-locBot[0]);
        let horizontalDistance = Math.abs(locClosestDirt[1]-locBot[1]);
    
        let verticalDirection = (locClosestDirt[0]-locBot[0] >= 0 ) ? "DOWN" : "UP";
        let horizontalDirection = (locClosestDirt[1]-locBot[1] >= 0 ) ? "RIGHT" : "LEFT";

        if (horizontalDistance >= verticalDistance) {
            result = horizontalDirection;
        } else {
            result =verticalDirection;
        }
        
    } else if (locDirt.length === 0 && locHidden.length > 0) {    // No Dirt is seen. There are remaining hidden location not visited yet. visit the longest distance first.
        let longestDistance = 0;
        // find closest gridCheck not visited
        for (let i = 0; i < locHidden.length; i++) {
            let distance = Math.abs(locHidden[i][0]-locBot[0]) + Math.abs(locHidden[i][1]-locBot[1]);
            if (distance >= longestDistance) {
                longestDistance = distance;
                locLongestHiddenNotVisited = locHidden[i];
            }
        }
        // find move direction toward closest Hidden
                
        let verticalDistance = Math.abs(locLongestHiddenNotVisited[0]-locBot[0]);
        let horizontalDistance = Math.abs(locLongestHiddenNotVisited[1]-locBot[1]);
        
        let verticalDirection = "";
        let horizontalDirection = "";
        let preferredVerticalVsHorizontal ="";
        
        let vDirect1 = "";
        let vDirect2 = "";
        let hDirect1 = "";
        let hDirect2 = "";
        
        
        // give some randomness in choosing direction to hidden area only if bot is not at boarderlines.
        if (randomRange(0,1) >= 1) {
            vDirect1 = "DOWN";
            vDirect2 = "UP";
        } else {
            vDirect1 = "UP";
            vDirect2 = "DOWN";
        }
        
        if (randomRange(0,1) >= 1) {
            hDirect1 = "RIGHT";
            hDirect2 = "LEFT";
        } else {
            hDirect1 = "LEFT";
            hDirect2 = "RIGHT";
        }
        
        if (botLocationCategory(locBot,MatrixDimension) != ""){
            if (botLocationCategory(locBot,MatrixDimension) == "vertexTopLeftBlockTop"){
                verticalDirection = "DOWN";
                horizontalDirection = "RIGHT";
                preferredVerticalVsHorizontal = "Vertical";                      
            } else if (botLocationCategory(locBot,MatrixDimension) == "vertexTopLeftBlockLeft"){
                verticalDirection = "DOWN";
                horizontalDirection = "RIGHT";
                preferredVerticalVsHorizontal = "Horizontal";                      
            } else if (botLocationCategory(locBot,MatrixDimension) == "2By2") {
                verticalDirection = "DOWN";
                horizontalDirection = "RIGHT";
                preferredVerticalVsHorizontal = "Horizontal";   
            } else if (botLocationCategory(locBot,MatrixDimension) == "TopSide") {
                verticalDirection = "DOWN";
                horizontalDirection = "RIGHT";
                preferredVerticalVsHorizontal = "Horizontal"
            } else if (botLocationCategory(locBot,MatrixDimension) == "vertexTopRight" || botLocationCategory(locBot,MatrixDimension) == "RightSide") {
                verticalDirection = "DOWN";
                horizontalDirection = "LEFT";
                preferredVerticalVsHorizontal = "Vertical";
            } else if (botLocationCategory(locBot,MatrixDimension) == "vertexBottomRight" || botLocationCategory(locBot,MatrixDimension) == "BottomSide") {
                verticalDirection = "UP";
                horizontalDirection = "LEFT";
                preferredVerticalVsHorizontal = "Horizontal";
            } else if (botLocationCategory(locBot,MatrixDimension) == "vertexBottomLeft" || botLocationCategory(locBot,MatrixDimension) == "LeftSide") {
                verticalDirection = "UP";
                horizontalDirection = "RIGHT";
                preferredVerticalVsHorizontal = "Vertical";
            }
        }
            
            
        if (preferredVerticalVsHorizontal == "Vertical" && botLocationCategory(locBot,MatrixDimension) != "") {
            result = verticalDirection;
        } else if (preferredVerticalVsHorizontal == "Horizontal" && botLocationCategory(locBot,MatrixDimension) != "") {
            result = horizontalDirection;
        } else {
            verticalDirection = (true) ? vDirect1 : vDirect2;
            horizontalDirection = (true) ? hDirect1 : hDirect2;
        
            if (horizontalDistance > verticalDistance) {
                result = horizontalDirection;
            } else if (horizontalDistance < verticalDistance) {
                result = verticalDirection;
            } else if (randomRange(0,1) === 0) {
                result = horizontalDirection;
            } else {
                result = verticalDirection;
            }
        }
                
    }
            
    //print the result    
    console.log(result);
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

const botLocationCategory = (locBot,MatrixDimension) => {
    if ( locBot[0] === 0 && locBot[1] <= (Math.floor(MatrixDimension[1] / 2) - 1) )  {
        return "vertexTopLeftBlockTop";
    } else if ( locBot[0] <= (Math.floor(MatrixDimension[0] / 2) - 1) && locBot[1] === 0 ) {
        return "vertexTopLeftBlockLeft";
    } else if ((locBot[0] === 1 && locBot[1] === 1)) {
        return "2By2";  
    } else if( locBot[0] === 0 && locBot[1] === MatrixDimension[1]-1) {
        return "vertexTopRight";
    } else if( locBot[0] === MatrixDimension[0]-1 && locBot[1] === 0) {
        return "vertexBottomLeft";
    } else if( locBot[0] === MatrixDimension[0]-1 && locBot[1] === MatrixDimension[1]-1) {
        return "vertexBottomRight";
    } else if (locBot[0] === 0) {
        return "TopSide";
    } else if (locBot[0] === MatrixDimension[0]-1) {
        return "BottomSide";
    } else if (locBot[1] === 0) {
        return "LeftSide";
    } else if (locBot[1] === MatrixDimension[1]-1) {
        return "RightSide";
    } else {
        return ""
    }
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
