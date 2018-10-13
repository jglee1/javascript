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
	
	let numToLookDetail = 9;   // 9! = 362880.
	
	let remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
	
	if (remainingPoints.length > 10) {
		let solution = solver(numRows,numColumns,numColors,interimGrid);      //find the entire steps of one solution.
	} else {
		let solution = detailSolver(numRows,numColumns,numColors,interimGrid); 
	}
	nextMove(solution);											// print the first step of one solution.
} 

function nextMove(solution) {
	//for (let i = 0; i < solution.length; i++) {
	//	console.log(solution[i][0],solution[i][1]);
	//}
	console.log(solution[0][0],solution[0][1]);
}


// go through all the possibililities.
function detailSolver(numRows,numColumns,numColors,interimGrid) {
	
	let remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
	let possibleSolutions = Create2DArray(remainingPoints.length);
	
	for (let i = 0; i < remainingPoints.length; i++) {
		
		let startPoint = remainingPoints[i];
		
		let copiedGrid = arrayDeepCopy(numRows,numColumns,interimGrid);
		
		let flagIsSolved = false;
		let flagCannotSolve = false;
		
		if(!isItEligiblePick(startPoint[0],pickPointCol[1],numRows,numColumns,interimGrid)) {
			possibleSolutions[i].push([]);
			flagIsSolved = false;
			flagCannotSolve = true;
		} else {   //eligible point
			possibleSolutions[i].push(remainingPoints[i]);    // start with i'th element in remainingPoints
		}
		
		while (flagIsSolved === false) {
			
			copiedGrid = oneIteration(startPointX,startPointY,numRows,numColumns,numColors,copiedGrid);
			
			flagIsSolved = isSolved(numRows,numColumns,copiedGrid);
			flagCannotSolve = canItNotBeSolved(numRows,numColumns,copiedGrid,numColors);
			if (flagIsSolved === false && flagCannotSolve === false) {
				NewRemainingPoints = findRemainingPoints(numRows,numColumns,copiedGrid);
				
			}
			
		}
		
	}
	
}


function oneIteration(startPointX,startPointY,numRows,numColumns,numColors,interimGrid) {
	let copiedGrid = arrayDeepCopy(numRows,numColumns,interimGrid);
	
	if(!isItEligiblePick(startPointX,startPointY,numRows,numColumns,copiedGrid)) {
		return null;
	else {
		let contiguousPoints = findContiguousPoints(startPointX,startPointY,numRows,numColumns,copiedGrid);
		copiedGrid = deleteContiguousPoints(contiguousPoints,copiedGrid); 
		copiedGrid = fallDown(numRows,numColumns,copiedGrid);
		copiedGrid = removeEmptyColumns(numRows,numColumns,copiedGrid);
		return copiedGrid;
	}
	return copiedGrid;
}

function fullIteration(pointOrderArray,numRows,numColumns,numColors,interimGrid) {
	let copiedGrid = arrayDeepCopy(numRows,numColumns,interimGrid);
	
	if(!isItEligiblePick(startPointX,startPointY,numRows,numColumns,copiedGrid)) {
		return;
	else {
		//decide on next startPointX,startPointY
		copiedGrid = oneIteration(startPointX,startPointY,numRows,numColumns,numColors,copiedGrid);
		fullIteration(startPointX,startPointY,numRows,numColumns,numColors,copiedGrid);	
	}
	return copiedGrid;
}


//find the longest contiguous columns and return array of points of the columns
function solver(numRows,numColumns,numColors,interimGrid){
	
	let rightSolution = [];   //sequence of right solution.
	
	let remainingPoints = [];
	
	const MAX_ITERATION = 100;
	
	let colorSet = new Set();  // Set { 'B', 'R' }
	colorSet = findColorSet(numRows,numColumns,interimGrid);
	//console.log(colorSet);

	// 1. randomly pick one point from the remaining grid points
	remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);

	//let OrigGrid = interimGrid.slice();
	//const OrigGrid = interimGrid.map(a => ({...a}));
 	let OrigGrid = arrayDeepCopy(numRows,numColumns,interimGrid);
	
/*	
	let pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the TopLeft vertex point. This is not to pick [0,0] in all cases
																// [0,0] is one of the stop condition in findcontiguousPoints func.
	let pickPoint = remainingPoints[pickIndex];
 */	
 
	let pickPoint = randomEligiblePick(numRows,numColumns,interimGrid,remainingPoints);
	
	let	pickPointRow = pickPoint[0];
	let	pickPointCol = pickPoint[1];
	
	let OrigPointRow = pickPointRow;
	let OrigPointCol = pickPointCol;
	
	rightSolution.push(pickPoint);
	
	//console.log("the Initial pick point");
	//console.log(pickPointRow,pickPointCol);
	
	let solved = false;
	let cannotBeSolved = false;
	while (solved === false) {

		//console.log("remainingPoints.length",remainingPoints.length);
		//console.log(interimGrid);
		//console.log("beginning pick point in while loop");
		//console.log(pickPointRow,pickPointCol);
		// 2. find contiguous points from the given point
		let contiguousPoints = findContiguousPoints(pickPointRow,pickPointCol,numRows,numColumns,interimGrid);
		// 3. delete the contiguous points
		interimGrid = deleteContiguousPoints(contiguousPoints,interimGrid);     //returns the updated interimGrid
		//console.log("after delete: interimGrid");
		//console.log(interimGrid);
		
		// 4. check if all blocks removed or there are remaining blocks that can not be removed. (i.e. only one block remaining for any color)
		
		

		
		// 5. points fall downs through the holes created
		interimGrid = fallDown(numRows,numColumns,interimGrid);
		//console.log("after fall down: interimGrid");
		//console.log(interimGrid);
		// 6. remove empty columns and slide other columns
		interimGrid = removeEmptyColumns(numRows,numColumns,interimGrid);
		//console.log("after empty columns: interimGrid");
		//console.log(interimGrid);

		// go through the process 1 - 5 until there is no remaining block. start a new process if solution is not found.
		
		solved = isSolved(numRows,numColumns,interimGrid);
		cannotBeSolved = canItNotBeSolved(numRows,numColumns,interimGrid,numColors);
		
		if (solved === true) {
			//console.log("solved === true !!!!!");
			return rightSolution;
		} else if (cannotBeSolved === false) {

			remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
			
/* 			pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
																		// [0,0] is one of the stop condition in findcontiguousPoints func.
			pickPoint = remainingPoints[pickIndex];		
*/
			 
			pickPoint = randomEligiblePick(numRows,numColumns,interimGrid,remainingPoints);
			
			if (pickPoint !== null) {
				pickPointRow = pickPoint[0];
				pickPointCol = pickPoint[1];		
				
				//let checkEligility = isItEligiblePick(pickPointRow,pickPointCol,numRows,numColumns,interimGrid);
				//console.log("checkEligility: ", checkEligility);

				// for (let i = 0; i < MAX_ITERATION; i++) {
					
					// if(!isItEligiblePick(pickPointRow,pickPointCol,numRows,numColumns,interimGrid) {
						// pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
						//													[0,0] is one of the stop condition in findcontiguousPoints func.
						// pickPoint = remainingPoints[pickIndex];		
						// pickPointRow = pickPoint[0];
						// pickPointCol = pickPoint[1];	
					// } else {
						// break;
					// }
				// }
			
				rightSolution.push(pickPoint);
				//console.log("In cannotBeSolved === false:");
				//console.log("New pick point");
				//console.log(pickPointRow,pickPointCol);
				//console.log("New pick point");
			} else {
				cannotBeSolved === true;
			}
			
		}  
		
		if (cannotBeSolved === true) {
			//console.log("In cannotBeSolved === true: Prev interimGrid");
			//console.log(interimGrid);

			interimGrid = arrayDeepCopy(numRows,numColumns,OrigGrid);
			
			//console.log("In cannotBeSolved === true: Deep copied interimGrid");
			//console.log(interimGrid);
			
			//console.log("In cannotBeSolved === true:");
			//console.log(interimGrid);
			
			remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);

/* 			pickIndex = randomRange(1,remainingPoints.length-1);   //do not pick the first point. This is not to pick [0,0] in all cases
																		// [0,0] is one of the stop condition in findcontiguousPoints func.
			pickPoint = remainingPoints[pickIndex];
 */			
			pickPoint = randomEligiblePick(numRows,numColumns,interimGrid,remainingPoints);
						
			pickPointRow = pickPoint[0];
			pickPointCol = pickPoint[1];		
					
			OrigPointRow = pickPointRow;
			OrigPointCol = pickPointCol;
			
			//reset rightSolution
			rightSolution = [];
			rightSolution.push(pickPoint);
			
			//console.log("cannotBeSolved === true:")
			//console.log("revised Initial pick point")
			//console.log(pickPointRow,pickPointCol);
		}	
	}
	// if solution is found, then return the first picked point.
	

	return rightSolution;
}

// random whole number between min and max
const randomRange = (myMin, myMax) =>  Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

// find remaining points from the interimGrid and return array of remaining points
const findRemainingPoints = (numRows,numColumns,interimGrid) => {
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
	//sameColorPoints.add([OrigPickPointRow,OrigPickPointCol]);
	
	//console.log("point location 1");
	//console.log(pickPointRow,pickPointCol);
	//add the adjacent points with the same color
	const innerFindContiguousPoints = (nextPointRow,nextPointCol,numRows,numColumns,interimGrid) => {
		
		// currentColor
		//console.log("testing 2");
		//console.log(interimGrid);
		//console.log("testing 2");
		
		//console.log(nextPointRow,nextPointCol);
		let currentColor = interimGrid[nextPointRow][nextPointCol];
		
		let feasiblePoint = false;   // need to have at least one adjacent block with the same color to be feasible.
		//console.log("currentColor",currentColor);
		//add the initial point
		
		//console.log("point location 2");
		//console.log(nextPointRow,nextPointCol);

		// resursion stop conditions
		
		// empty point
		if (interimGrid[nextPointRow][nextPointCol] === '-') {              // stop condition for recursive search
			//console.log("location A");
			return;
		}
		
		// already has the point
		if (nextPointRow !== OrigPickPointRow && nextPointCol !== OrigPickPointCol && hasPointAlready([nextPointRow,nextPointCol],sameColorPoints)) {				// stop if the poit is already in the solution set.
			//console.log("location C");
			return;
		}
		// different color
		if (interimGrid[nextPointRow][nextPointCol] !== interimGrid[OrigPickPointRow][OrigPickPointCol]) {  // different color, then stop
			//console.log("location D");
			return;
		}
		
		// add new point only.

		sameColorPoints.add([nextPointRow,nextPointCol]);


		//console.log("location E");
		//add 'up' point if up has the same color
		if (nextPointRow !== 0) {         //if not on the top line
			if (interimGrid[nextPointRow-1][nextPointCol] === currentColor && !hasPointAlready([nextPointRow-1,nextPointCol],sameColorPoints)) {       //same color
			    //console.log("location up: ", sameColorPoints);

				innerFindContiguousPoints(nextPointRow-1,nextPointCol,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}
		//check if down is the same
		if (nextPointRow !== numRows-1) {         //if not on the bottom line
			if (interimGrid[nextPointRow+1][nextPointCol] === currentColor && !hasPointAlready([nextPointRow+1,nextPointCol],sameColorPoints)) {       //same color
				//console.log("location down: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow+1,nextPointCol,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}
		//check if right is the same
		if (nextPointCol !== numColumns-1) {         //if not on the bottom line
			if (interimGrid[nextPointRow][nextPointCol+1] === currentColor && !hasPointAlready([nextPointRow,nextPointCol+1],sameColorPoints)) {       //same color
				//console.log("location right: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow,nextPointCol+1,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}	
		//check if left is the same
		if (nextPointCol !== 0) {         //if not on the bottom line
			if (interimGrid[nextPointRow][nextPointCol-1] === currentColor && !hasPointAlready([nextPointRow,nextPointCol-1],sameColorPoints)) {       //same color
				//console.log("location left: ", sameColorPoints);
				innerFindContiguousPoints(nextPointRow,nextPointCol-1,numRows,numColumns,interimGrid);   //recursive search	
			}	
		}	
	
	}
	
	if (typeof nextPointRow === "number" && typeof nextPointCol === "number") {
		innerFindContiguousPoints(nextPointRow,nextPointCol,numRows,numColumns,interimGrid);
	} else {
		return sameColorPoints;
	}
	return sameColorPoints;
	
}

const deleteContiguousPoints = (contiguousPoints,interimGrid) => {
	// if contiguousPoints is not empty
	if (contiguousPoints.size !== 0) {
		contiguousPoints.forEach(function(element) {
			interimGrid[element[0]][element[1]] = '-';
		});
	} else {
		return interimGrid;
	}
	return interimGrid;
}

const fallDown = (numRows,numColumns,interimGrid) => {
	if (isSolved(numRows,numColumns,interimGrid)) {
		return interimGrid;
	}
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
	//console.log(interimGrid);
	if (isSolved(numRows,numColumns,interimGrid)) {
		return interimGrid;
	}
	//check the bottom line only to see if that column is empty. 
	for (let j = 0; j < numColumns; j++) {
		let isCurrentColumnEmpty = true;
		if (interimGrid[numRows-1][j] !== '-') {        //if any point in the bottom row is not '-', then, it's not an empty column.
				isCurrentColumnEmpty = false;
		}
		
	
		//if empty column
		if (isCurrentColumnEmpty === true) {
			//console.log("isCurrentColumnEmpty: ",isCurrentColumnEmpty);
			//console.log(interimGrid);
			//move the next column to the prev column starting from the empty col. (i.e. delete the empty column.)
			for (let k = j; k < numColumns -1; k++ ) {    // until numColumns-2
				for (let r = 0; r < numRows; r++) {
					interimGrid[r][k] = interimGrid[r][k+1];
				}
			
			}
			// add '-' to the last column
			for (let r = 0; r < numRows; r++) {
					interimGrid[r][numColumns -1] = '-';
			}
			
			//console.log(interimGrid);
		}
	}
	//console.log(interimGrid);
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

const canItNotBeSolved = (numRows,numColumns,interimGrid,numColors) => {
	let result = false;
	
	let colorSet = new Set();  // Set { 'B', 'R' }
	colorSet = findColorSet(numRows,numColumns,interimGrid);
	
	// only one point remaining for any color.
	for (let color of colorSet) {
		if (color !== '-' && countEachColor(color, numRows,numColumns,interimGrid) === 1) {
			result = true;
			return result;
		}
		
	}
	// go thru the remaining points to see if all of the points cannot be removed. i.e. all isolated one point status.
	// but only check this if the num of remaining points are less than THRESHOLD_NUM.
	
	const THRESHOLD_NUM = 0; //numColors; 
	
	let remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
	if (remainingPoints.length <= THRESHOLD_NUM) {
		//console.log ("testing 1");
		//console.log(remainingPoints.length);
		//console.log(interimGrid);
		//console.log ("testing 1");
		
		for (let i = 0; i < remainingPoints.length; i++) {
			let contiguousPoints = findContiguousPoints(remainingPoints[i][0],remainingPoints[i][1],numRows,numColumns,interimGrid);
			if (contiguousPoints.size === 1) {
				result = true;
				return result;
			}
		}
	}
	
	return result;
}

const countEachColor = (color, numRows,numColumns,interimGrid) => {
	let totalNum = 0;
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
			if (interimGrid[i][j] === color && color !== '-') {
				totalNum++;
			}
		}
	}
	return totalNum;
}

const hasPointAlready = ([nextPointRow,nextPointCol], setOfPoints) => {
	result = false;
	//console.log("before printing setOfPoints");
	//console.log(setOfPoints);
	//console.log("after printing setOfPoints");
	if (setOfPoints.size === 0) {
		result = false;
		return result;
	}
	let arrayOfPoints = Array.from(setOfPoints);
	
	//console.log("before printing arrayOfPoints");
	//console.log(arrayOfPoints);
	//console.log("after printing arrayOfPoints");
	//console.log(arrayOfPoints.length);
	
	for (let i = 0; i < arrayOfPoints.length; i++) {
		if (arrayOfPoints[i][0] === nextPointRow && arrayOfPoints[i][1] === nextPointCol) {
			result = true;
			return result;
		}
	}
	return result;
}

// deep copy two dimensional array
const arrayDeepCopy = (numRows,numColumns,interimGrid) => {
	let newArray = Create2DArray(numRows);
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
				newArray[i][j] = interimGrid[i][j];
		}
	}
	return newArray;
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

const isItEligiblePick = (pickPointRow,pickPointCol,numRows,numColumns,interimGrid) => {
	let result = false;
	
	let currentColor = interimGrid[pickPointRow][pickPointCol];
	
	if (pickPointRow !== 0) {
		if (interimGrid[pickPointRow-1][pickPointCol] === currentColor) {
			result = true;
			return true;
		}
	} else if (pickPointRow !== numRows - 1) {
		if (interimGrid[pickPointRow+1][pickPointCol] === currentColor) {
			result = true;
			return true;
		}
	} else if (pickPointCol !== numColumns - 1) {
		if (interimGrid[pickPointRow][pickPointCol+1] === currentColor) {
			result = true;
			return true;
		}
	} else if (pickPointCol !== 0) {
		if (interimGrid[pickPointRow][pickPointCol-1] === currentColor) {
			result = true;
			return true;
		}
	}
	return result;
}

const randomEligiblePick = (numRows,numColumns,interimGrid,remainingPoints) => {
	let result = [];
	let pickIndex = randomRange(0,remainingPoints.length-1);  
	let pickPoint = remainingPoints[pickIndex];	
	let foundEligiblePoint = false;
	while (foundEligiblePoint === false) {
		if (isItEligiblePick(pickPoint[0],pickPoint[1],numRows,numColumns,interimGrid)) {
			foundEligiblePoint = true;
		} else {           // if not eligible
			remainingPoints.splice(pickIndex,1);   //remove ineligible item from array
			if (remainingPoints.length >= 1) {
				pickIndex = randomRange(0,remainingPoints.length-1);  
				pickPoint = remainingPoints[pickIndex];	
			}
			else {
				return null;
			}
		}
	}
	return pickPoint;
	
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