//click-o-mania

function processData(input) {
    let lines = input.split('\n');
	let firstLine = lines[0].split(" ");
    let numRows = parseInt(firstLine[0]);
	let numColumns = parseInt(firstLine[1]);
	let numColors = parseInt(firstLine[2]);
	let grid = [];
	let solution = [];
	
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
	
	let remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
	
	solution = completeSolver(numRows,numColumns,numColors,interimGrid);
	//console.log(solution);
	nextMove(solution);											// print the first step of one solution.
} 

function nextMove(solution) {
	//for (let i = 0; i < solution.length; i++) {
	//	console.log(solution[i][0],solution[i][1]);
	//}
	
	console.log(solution[0][0],solution[0][1]);
}


// go through all the possibililities.
function completeSolver(numRows,numColumns,numColors,interimGrid) {
	const MAX_ITERATION = 1000000;
	const MAX_SEQ_SEARCH = 5000;
	let uniqueEligiblePoints = [];
	let solSeq = [];      // n by m by 2 array.  e.g. [ [ p1,p2 ], [p2, p3, p6], [p2, p4, p5, p7, p8 ], ... ,[ p14, p2, p3, p7,] ] and each p is [x1, y1] array.
	let matchingGrid = [];  // n by m by (n by m) array. e.g. [ [m1, m2], [m2, m3, m6], ... [m14, m2, m3, m7] ] and each m is (n by m) array for grid.
	
	uniqueEligiblePoints = findAllEligibleUniquePoints(numRows,numColumns,interimGrid);
	if (uniqueEligiblePoints.length === 0) {
		return "No Solution"
	}
	//update SolSeq
	for (let i = 0; i < uniqueEligiblePoints.length; i++) {
		solSeq.push([uniqueEligiblePoints[i]]);
	}
	//console.log("location 1");
	//console.log("uniqueEligiblePoints");
	//console.log(uniqueEligiblePoints);
	for (let i = 0; i < uniqueEligiblePoints.length; i++) {
		let nextGrid = [];
		nextGrid = oneIteration(uniqueEligiblePoints[i][0],uniqueEligiblePoints[i][1],numRows,numColumns,numColors,interimGrid);
		matchingGrid.push(nextGrid);      	//update matchingGrid
	}
	//console.log("location 2");
	//console.log(solSeq);
	//console.log(matchingGrid);
	//console.log("location 2 end");
	let Solved = false;
	let count = 0;
	while (!Solved && count <= MAX_ITERATION) {
		count++;
		//console.log("count: ", count);
		//check if solved
		
		// if (count === 2) {
			// console.log("count: ", count);
			// console.log("is solSeq.length equal to matchingGrid.length: ", solSeq.length === matchingGrid.length);
			// console.log("solSeq.length",solSeq.length);
			// console.log("matchingGrid.length",matchingGrid.length);
			// // console.log("solSeq");
			// // console.log(solSeq);
			// // console.log("matchingGrid location front: ");
			// // console.log(matchingGrid);
			// // console.log(matchingGrid.length);
		// }
		
		//check if solved.
		for (let i = 0; i < matchingGrid.length; i++) {
			//console.log("matchingGrid location 1: ");
			//console.log(matchingGrid[i]);
			// if (count === 2 && i >= 20) {
				// console.log("count: ", count);
				// console.log("i: ", i);
				// console.log("matchingGrid location 1: ");
				// console.log(matchingGrid[i]);
			// }
			if(isSolved(numRows,numColumns,matchingGrid[i])) {
				
				//console.log("solved");
				//console.log("solSeq[i]");
				//console.log(solSeq[i]);
				
				Solved = true;
				return solSeq[i];          // return the first point in the solution sequence.
			}
		}
		//console.log("location w-1, count: ", count);
		//not solved yet.
		//delete one from SolSeq and matchingGrid if grid is not solvable.
		indexNotSolvable = [];
		for (let i = 0; i < matchingGrid.length; i++) {
			if (NotSolvable(numRows,numColumns,matchingGrid[i],numColors)) {
				indexNotSolvable.push(i);
			}
		}
		//console.log("location w-2, count: ", count);
		for (let i = indexNotSolvable.length - 1; i >=0; i--) {
			solSeq.splice(i,1);
			matchingGrid.splice(i,1);
		}
		
		if (solSeq.length === 0) {
			return "No Solution";
		}
		//for each grid, find all unique eligible points
		// console.log("location 3. Is solSeq.length equal to matchingGrid.length: ", solSeq.length === matchingGrid.length);
		// console.log("location 3. solSeq.length",solSeq.length);
		// console.log("location 3. matchingGrid.length",matchingGrid.length);
		
		prevMatchGridLength = matchingGrid.length;
		
		let preSolSeq = solSeq;
		
		//console.log(prevMatchGridLength);
		//console.log("prevMatchGridLength");
		for (let i = 0; i < Math.min(prevMatchGridLength,MAX_SEQ_SEARCH); i++) {    //find nextGrid for up to MAX_SEQ_SEARCH.
			let newUniqueEligiblePoints = [];
			newUniqueEligiblePoints = findAllEligibleUniquePoints(numRows,numColumns,matchingGrid[i]);
			
			// if (i === 0) {
				// console.log("location 3 A");
				// console.log("solSeq${i}: ", solSeq[i]);
				// console.log(matchingGrid[i]);
				// console.log(uniqueEligiblePoints);
			// }
			
			//get newSeq and newGrid
			let newSeq = [];
			let newGrid = [];
			for (let j = 0; j < newUniqueEligiblePoints.length; j++) {
				newSeq.push([...solSeq[i],newUniqueEligiblePoints[j]]);
				let nextGridForNewSeq = oneIteration(newUniqueEligiblePoints[j][0],newUniqueEligiblePoints[j][1],numRows,numColumns,numColors,matchingGrid[i]);
				newGrid.push(nextGridForNewSeq);
			}
			//add to solSeq and matchingGrid to the back
			solSeq.push(...newSeq);
			matchingGrid.push(...newGrid);
		}
		
		//stop if no points were added to solSeq.
		if (preSolSeq.length === solSeq.length) {
			return solSeq[solSeq.length-1];
		}
		
		// console.log("location 4. Is solSeq.length equal to matchingGrid.length: ", solSeq.length === matchingGrid.length);
		// console.log("location 4. solSeq.length",solSeq.length);
		// console.log("location 4. matchingGrid.length",matchingGrid.length);
		
		//delete prev item from SolSeq and matchingGrid from front
		solSeq.splice(0,prevMatchGridLength);
		matchingGrid.splice(0,prevMatchGridLength);
		
		// console.log("location 5. Is solSeq.length equal to matchingGrid.length: ", solSeq.length === matchingGrid.length);
		// console.log("location 5. solSeq.length",solSeq.length);
		// console.log("location 5. matchingGrid.length",matchingGrid.length);
		
		//eliminate the same matchingGrid
		let indexToEliminate = [];
		indexToEliminate = findIndexOfDuplicateGrids(numRows,numColumns,matchingGrid);
		// console.log("indexToEliminate");
		// console.log(indexToEliminate);
		
		for (let i = indexToEliminate.length - 1; i>=0; i--) {
			solSeq.splice(i,1);
			matchingGrid.splice(i,1);
		}
		//console.log("location 6. Is solSeq.length equal to matchingGrid.length: ", solSeq.length === matchingGrid.length);
		//console.log("location 6. solSeq.length",solSeq.length);
		//console.log("location 6. matchingGrid.length",matchingGrid.length);
	}
}


function oneIteration(startPointX,startPointY,numRows,numColumns,numColors,interimGrid) {
	let copiedGrid = arrayDeepCopy(numRows,numColumns,interimGrid);
	
	if(!isItEligiblePick(startPointX,startPointY,numRows,numColumns,copiedGrid)) {
		return null;
	} else {
		let contiguousPoints = findContiguousPoints(startPointX,startPointY,numRows,numColumns,copiedGrid);
		copiedGrid = deleteContiguousPoints(contiguousPoints,copiedGrid); 
		copiedGrid = fallDown(numRows,numColumns,copiedGrid);
		copiedGrid = removeEmptyColumns(numRows,numColumns,copiedGrid);
		return copiedGrid;
	}
	return copiedGrid;
}

//given a grid, find all unique eligible points to select. includes just one unique eligible point in a contiguous set.
function findAllEligibleUniquePoints(numRows,numColumns,interimGrid) {   

	let remainingPoints = [];
	remainingPoints = findRemainingPoints(numRows,numColumns,interimGrid);
	let eligiblePoints = [];
	for (let i = 0; i < remainingPoints.length; i++) {
		if(isItEligiblePick(remainingPoints[i][0],remainingPoints[i][1],numRows,numColumns,interimGrid)) {
			eligiblePoints.push(remainingPoints[i]);
		}
	}
	let uniqueEliglblePoints = []   //uniqueEliglblePoints has only one unique point from Contiguous points.
	let checkedPoints = [];
	for (let i = 0; i < eligiblePoints.length; i++) {
		let contiguousPoints = [];
		if ( !IsPointInArrayOfPoints(eligiblePoints[i][0],eligiblePoints[i][1],checkedPoints) ) {       //if eligible point is not in checkedPoints.
			let contiguousPointsSet=findContiguousPoints(eligiblePoints[i][0],eligiblePoints[i][1],numRows,numColumns,interimGrid);
			contiguousPoints=Array.from(contiguousPointsSet);
			checkedPoints.push(...contiguousPoints);
			uniqueEliglblePoints.push(eligiblePoints[i]);
		}
	}
	uniqueEliglblePoints = uniqueEliglblePoints.reverse();  //reserve the order.  Bottom ones have better chance to remove more points.
	return uniqueEliglblePoints;
}

function IsPointInArrayOfPoints(pointX,pointY,arrayofPoints) {
	for (let i = 0; i < arrayofPoints.length; i++) {
		if (pointX === arrayofPoints[i][0] && pointY === arrayofPoints[i][1]) {
			return true;
		}
	}
	return false;
}

//check equality for 2 by 2 grids of two.
function isSameGrid(numRows,numColumns,grid1, grid2) {  
	//check dimenstions
	// if (grid1.length !== grid2.length) {
		// return false;
	// }
	// if (grid1[0].length !== grid2[0].length) {
		// return false;
	// }
	//check each element
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
			// if (i === 0 && j === 0) {
				// console.log("grid1[i][j]: ",grid1[i][j]);
				// console.log("grid2[i][j]: ",grid2[i][j]);
				// console.log("grid1[i][j] !== grid2[i][j]: ",grid1[i][j] !== grid2[i][j])
			// }
			if (grid1[i][j] !== grid2[i][j]) {
				return false;
			}
		}
	}
	return true;
}

function findIndexOfDuplicateGrids(numRows,numColumns,matchingGrid) {     // matchingGrid is array of grids.
	let indexOfDuplicate = [];
	for (let i = 0; i < matchingGrid.length; i++) {
		for (let j = i + 1; j < matchingGrid.length; j++) {
			
			// if( i === 0 && j === 1) {
				// console.log("in findIndexOfDuplicateGrids");
				// console.log(matchingGrid[i]);
				// console.log(matchingGrid[j]);
			// }
			
			if ( isSameGrid(numRows,numColumns,matchingGrid[i],matchingGrid[j]) ) {
				if (indexOfDuplicate.length === 0) {
					indexOfDuplicate.push(j);
				} else if (indexOfDuplicate.indexOf(j) < 0) {
					indexOfDuplicate.push(j);
				}
			}
		}
	}
	return indexOfDuplicate;
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
	//console.log(interimGrid);
	let colorArray = [];  // array [ 'B', 'R' ]
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; j++) {
			//console.log("i,j: ",i,j);
			if (colorArray.length === 0) {
				colorArray.push(interimGrid[i][j]);
			} else if (colorArray.indexOf(interimGrid[i][j]) < 0) {
				colorArray.push(interimGrid[i][j]);
			}
		}
	}
	//console.log(colorArray);
	return colorArray;
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
	
	let colorArray = [];  // array [ 'B', 'R' ]
	colorArray = findColorSet(numRows,numColumns,interimGrid);
	
	if (colorArray.length === 1 && colorArray[0] === '-') {
		result = true;
	}
	
	return result;
}

const NotSolvable = (numRows,numColumns,interimGrid,numColors) => {
	let result = false;
	
	let colorArray = [];  // array [ 'B', 'R' ]
	colorArray = findColorSet(numRows,numColumns,interimGrid);
	
	// only one point remaining for any color.
	for (let i = 0; i < colorArray.length; i++) {
		let color = colorArray[i];
		if (color !== '-' && countEachColor(color, numRows,numColumns,interimGrid) === 1) {
			result = true;
			return result;
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
	
	if (interimGrid[pickPointRow][pickPointCol] === '-') {
		return false;
	}
	if (pickPointRow !== 0) {
		if (interimGrid[pickPointRow-1][pickPointCol] === currentColor) {
			return true;
		}
	} else if (pickPointRow !== numRows - 1) {
		if (interimGrid[pickPointRow+1][pickPointCol] === currentColor) {
			return true;
		}
	} else if (pickPointCol !== numColumns - 1) {
		if (interimGrid[pickPointRow][pickPointCol+1] === currentColor) {
			return true;
		}
	} else if (pickPointCol !== 0) {
		if (interimGrid[pickPointRow][pickPointCol-1] === currentColor) {
			return true;
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