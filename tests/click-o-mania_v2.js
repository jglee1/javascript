//click-o-mania

function processData(input) {
    let lines = input.split('\n');
	let firstLine = lines[0].split(" ");
    let numRows = parseInt(firstLine[0]);
	let numColumns = parseInt(firstLine[1]);
	let numColors = parseInt(firstLine[2]);
	let grid = [];
	
	for (let i = 1; i <= numRows; ++i) {
		let oneRow = []
		for (let j = 0; j < numColumns; j++) {
            oneRow.push(lines[i][j]);
		}
		grid.push(oneRow);
    }
	//console.log("grid");
	//console.log(grid);
//	console.log(grid[0][2]==grid[0][3]);
//	console.log(grid[0][2]);
//	console.log(grid[0][3]);
	let interimGrid = grid.slice();
	let solution = solver(numRows,numColumns,numColors,interimGrid);      //find the entire steps of one solution.
	nextMove(solution);											// print the first step of one solution.
} 

function nextMove(solution) {
	console.log(solution[0],solution[1]);
}


//find the longest contiguous columns and return array of points of the columns
function solver(numRows,numColumns,numColors,interimGrid){
	
	let remainingPoints = [];
	
	let colorSet = new Set();  // Set { 'B', 'R' }
	colorSet = findColorSet(numRows,numColumns,interimGrid);
	//console.log(colorSet);

	// 1. randomly pick one point from the remaining grid points
	remainingPoints = findremainingPoints(numRows,numColumns,interimGrid);

	let OrigGrid = interimGrid;
	let pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the TopLeft vertex point. This is not to pick [0,0] in all cases
																// [0,0] is one of the stop condition in findcontiguousPoints func.
	let pickPoint = remainingPoints[pickIndex];
	
	let	pickPointRow = pickPoint[0];
	let	pickPointCol = pickPoint[1];
	
	let OrigPointRow = pickPointRow;
	let OrigPointCol = pickPointCol;
	
	console.log(pickPointRow,pickPointCol);
	let solved = false;
	let cannotBeSolved = false;
	while (solved === false && cannotBeSolved === false) {

		console.log("remainingPoints.length",remainingPoints.length);
		//console.log(interimGrid);
		console.log(pickPointRow,pickPointCol);
		// 2. find contiguous points from the given point
		let contiguousPoints = findContiguousPoints(pickPointRow,pickPointCol,numRows,numColumns,interimGrid);
		// 3. delete the contiguous points
		interimGrid = deleteContiguousPoints(contiguousPoints,interimGrid);     //returns the updated interimGrid
		//console.log("after delete: interimGrid");
		//console.log(interimGrid);
		// 4. points fall downs through the holes created
		interimGrid = fallDown(numRows,numColumns,interimGrid);
		//console.log("after fall down: interimGrid");
		//console.log(interimGrid);
		// 5. remove empty columns and slide other columns
		interimGrid = removeEmptyColumns(numRows,numColumns,interimGrid);
		console.log("after empty columns: interimGrid");
		console.log(interimGrid);
		// 6. check if all blocks removed or there are remaining blocks that can not be removed. (i.e. only one block remaining for any color)
		
		solved = isSolved(numRows,numColumns,interimGrid);
		cannotBeSolved = canItNotBeSolved(numRows,numColumns,interimGrid);
		// go through the process 1 - 5 until there is no remaining block. start a new process if solution is not found.
	
		if (solved === true) {
			console.log("solved === true !!!!!");
			return [OrigPointRow, OrigPointCol];
		} else if (cannotBeSolved === false) {

			remainingPoints = findremainingPoints(numRows,numColumns,interimGrid);

			pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
																		// [0,0] is one of the stop condition in findcontiguousPoints func.
			pickPoint = remainingPoints[pickIndex];
			pickPointRow = pickPoint[0];
			pickPointCol = pickPoint[1];		
		
			console.log("cannotBeSolved === false:");
			console.log(pickPointRow,pickPointCol);
		} else if (cannotBeSolved === true) {
			interimGrid = OrigGrid;				//restart search.
			
			remainingPoints = findremainingPoints(numRows,numColumns,interimGrid);

			pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
																		// [0,0] is one of the stop condition in findcontiguousPoints func.
			pickPoint = remainingPoints[pickIndex];
			pickPointRow = pickPoint[0];
			pickPointCol = pickPoint[1];		
					
			OrigPointRow = pickPointRow;
			OrigPointCol = pickPointCol;

			console.log("cannotBeSolved === true:")
			console.log(pickPointRow,pickPointCol);
		}
		
		remainingPoints = findremainingPoints(numRows,numColumns,interimGrid);

		let pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
																		// [0,0] is one of the stop condition in findcontiguousPoints func.
		let pickPoint = remainingPoints[pickIndex];
		let	pickPointRow = pickPoint[0];
		let	pickPointCol = pickPoint[1];
			
	}
	// if solution is found, then return the first picked point.
	

	return [OrigPointRow,OrigPointCol];
}

// random whole number between min and max
const randomRange = (myMin, myMax) =>  Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

// find remaining points from the interimGrid and return array of remaining points
const findremainingPoints = (numRows,numColumns,interimGrid) => {
	let remainingPoints = [];
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
			if(interimGrid[i][j] !== '-') {
				remainingPoints.push([i,j]);
			}
		}
	}
	return remainingPoints;
	
}

const findColorSet = (numRows,numColumns,interimGrid) => {
	let colorSet = new Set();  // Set { 'B', 'R' }
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
			colorSet.add(interimGrid[i][j]);
		}
	}
	return colorSet;
}

const findContiguousPoints = (pickPointRow,pickPointCol,numRows,numColumns,interimGrid) => {
	
	var sameColorPoints = new Set();    // e.g. ending result of this would be Set { [1,1],[0,1],[1,0] }. covers all the scope in outer func.
	
	var OrigPickPointRow = pickPointRow;
	var OrigPickPointCol = pickPointCol;
	
	let nextPointRow = pickPointRow;
	let nextPointCol = pickPointCol;
	
	// add the initial point
	sameColorPoints.add([OrigPickPointRow,OrigPickPointCol]);
	
	//console.log("point location 1");
	//console.log(pickPointRow,pickPointCol);
	//add the adjacent points with the same color
	const innerFindContiguousPoints = (nextPointRow,nextPointCol,numRows,numColumns,interimGrid) => {
		
		// currentColor
		let currentColor = interimGrid[nextPointRow][nextPointCol];
		//console.log("currentColor",currentColor);
		//add the initial point
		
		//console.log("point location 2");
		//console.log(nextPointRow,nextPointCol);

		// resursion end conditions
		
		if (interimGrid[nextPointRow][nextPointCol] === '-') {              // stop condition for recursive search
			//console.log("location A");
			return;
		}
		if (nextPointRow === 0 && nextPointCol === 0) {
			//console.log("location B");
			return;															// stop if reach [0,0]
		}
		if (nextPointRow !== OrigPickPointRow && nextPointCol !== OrigPickPointCol && hasPointAlready([nextPointRow,nextPointCol],sameColorPoints)) {				// stop if the poit is already in the solution set.
			//console.log("location C");
			return;
		}	
		if (interimGrid[nextPointRow][nextPointCol] !== interimGrid[OrigPickPointRow][OrigPickPointCol]) {  // different color, then stop
			//console.log("location D");
			return;
		}
		
		// add the initial point
		if (!hasPointAlready([nextPointRow,nextPointCol],sameColorPoints)) {
			sameColorPoints.add([nextPointRow,nextPointCol]);
		}
		
		//console.log("location E");
		//add 'up' point if up has the same color
		if (nextPointRow !== 0) {         //if not on the top line
			if (interimGrid[nextPointRow-1][nextPointCol] === currentColor && !hasPointAlready([nextPointRow-1,nextPointCol],interimGrid)) {       //same color
			    //console.log("location up: ", sameColorPoints);

				innerFindContiguousPoints(nextPointRow-1,nextPointCol,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}
		//check if down is the same
		if (nextPointRow !== numRows-1) {         //if not on the bottom line
			if (interimGrid[nextPointRow+1][nextPointCol] === currentColor && !hasPointAlready([nextPointRow+1,nextPointCol],interimGrid)) {       //same color
				//console.log("location down: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow+1,nextPointCol,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}
		//check if right is the same
		if (nextPointCol !== numColumns-1) {         //if not on the bottom line
			if (interimGrid[nextPointRow][nextPointCol+1] === currentColor && !hasPointAlready([nextPointRow,nextPointCol+1],interimGrid)) {       //same color
				//console.log("location right: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow,nextPointCol+1,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}	
		//check if left is the same
		if (nextPointCol !== 0) {         //if not on the bottom line
			if (interimGrid[nextPointRow][nextPointCol-1] === currentColor && !hasPointAlready([nextPointRow,nextPointCol-1],interimGrid)) {       //same color
				//console.log("location left: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow,nextPointCol-1,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}	
	
	}
	
	innerFindContiguousPoints(nextPointRow,nextPointCol,numRows,numColumns,interimGrid);
	
	return sameColorPoints;
	
}

const deleteContiguousPoints = (contiguousPoints,interimGrid) => {
	contiguousPoints.forEach(function(element) {
		interimGrid[element[0]][element[1]] = '-';
	});
	return interimGrid;
}

const fallDown = (numRows,numColumns,interimGrid) => {
	for (let j = 0; j < numColumns; j++) {
		for (let i = numRows - 1; i > 0; i--) {     // no fall down at the top line ( i === 0)
			if (interimGrid[i][j] === '-') {     // fall down all points above (i,j) point
				let numOfConsecutiveHoles = 1;
				let moreHoles = true;       // need to check more holes above.
				while (moreHoles) {
					if (i - numOfConsecutiveHoles >= 0) {
						if (interimGrid[i - numOfConsecutiveHoles][j] === '-') {
							numOfConsecutiveHoles++;
						} else {
							moreHoles = false;
						}
					} else {
						moreHoles = false;
					}
				}
				
				for (let k = i; k - numOfConsecutiveHoles + 1 > 0; k--) {
					interimGrid[k][j] = interimGrid[k-numOfConsecutiveHoles][j];      // fall down from row i-1 to row i.
					//interimGrid[k-numOfConsecutiveHoles][j] = '-';
				}
				for (let r = 0; r < numOfConsecutiveHoles; r++) {
					interimGrid[r][j] = '-';                   // set the top numOfConsecutiveHoles row(s) of column j to be '-'.
				}
			}
		}
	}
	return interimGrid;
}

const removeEmptyColumns = (numRows,numColumns,interimGrid) => {
	for (let j = 0; j < numColumns; j++) {
		let isCurrentColumnEmpty = true;
		for (let i = 0; i < numRows; i++) {
			if (interimGrid[i][j] !== '-') {        //if any point in the column is not '-', then, it's not an empty column.
				isCurrentColumnEmpty = false;
			}
		}
	
		//if empty column
		if (isCurrentColumnEmpty === true) {
			console.log("isCurrentColumnEmpty: ",isCurrentColumnEmpty);
			console.log(interimGrid);
			for (let k = j; k < numColumns -1; k++ ) {    // until numColumns-1
				for (let r = 0; r < numRows; r++) {
					interimGrid[r][k] = interimGrid[r][k+1];
				}
			
			}
			console.log(interimGrid);
		}
	}
	return interimGrid;
}

const isSolved = (numRows,numColumns,interimGrid) => {
	let result = false;
	
	let colorSet = new Set();  // Set { 'B', 'R' }
	colorSet = findColorSet(numRows,numColumns,interimGrid);
	
	let colorArray = Array.from(colorSet);
	if (colorArray.length === 1 && colorArray[0] === '-') {
		result = true;
	}
	
	return result;
}

const canItNotBeSolved = (numRows,numColumns,interimGrid) => {
	let result = false;
	
	let colorSet = new Set();  // Set { 'B', 'R' }
	colorSet = findColorSet(numRows,numColumns,interimGrid);
	
	for (let color of colorSet) {
		if (color !== '-' && countEachColor(color, numRows,numColumns,interimGrid) === 1) {
			result = true;
			break;
		}
		
	}
	return result;
}

const countEachColor = (color, numRows,numColumns,interimGrid) => {
	let totalNum = 0;
	for (let i = 0; i < interimGrid.length; ++i) {
		for (let j = 0; j < interimGrid[0].length; j++) {
			if (interimGrid[i][j] === color && color !== '-') {
				totalNum++;
			}
		}
	}
	return totalNum;
}

const hasPointAlready = ([nextPointRow,nextPointCol], setOfPoints) => {
	result = false;
	
	let arrayOfPoints = Array.from(setOfPoints);
	
	for (let i = 0; i < arrayOfPoints.length; i++) {
		if (arrayOfPoints[i][0] === nextPointRow && arrayOfPoints[i][1] === nextPointCol) {
			result = true;
			return result;
		}
	}
	return result;
}

const gcd = function(a, b) {
    if ( !b) {
        return a;
    }

    return gcd(b, a % b);
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