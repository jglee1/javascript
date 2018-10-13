function processData(input) {
    var lines = input.split('\n');
    var dimension = parseInt(lines[0]);
    var grid = [];
    for(var i = 1; i <= dimension; ++i)
    {
        grid.push(lines[i]);
    }
    displayPathtoPrincess(dimension, grid);
}

function displayPathtoPrincess(dimension, grid)
{
    // find the location of bot and princess
    let locPrincess = [-1,-1];
    let locBot = [-1,-1];
    
    //console.log(grid);
    
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (grid[i][j] === "p") {
                locPrincess = [i,j];
            }
            if (grid[i][j] === "m") {
                locBot = [i,j];
            }
        }
    }
    // calculate distance and direction from bot to princess
    let verticalDistance = Math.abs(locPrincess[0]-locBot[0]);
    let horizontalDistance = Math.abs(locPrincess[1]-locBot[1]);
    
    let verticalDirection = (locPrincess[0]-locBot[0] > 0 ) ? "DOWN" : "UP";
    let horizontalDirection = (locPrincess[1]-locBot[1] > 0 ) ? "RIGHT" : "LEFT";
    
    //print the result
    for (let i = 0; i < verticalDistance; i++) {
        console.log(verticalDirection);
    }
    for (let i = 0; i < horizontalDistance; i++) {
        console.log(horizontalDirection);
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