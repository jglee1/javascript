//click-o-mania

function processData(input) {
    let lines = input.split('\n');
	let firstLine = lines[0].split(" ");
    let numRows = parseInt(firstLine[0]);
	let numColumns = parseInt(firstLine[1]);
	let numColors = parseInt(firstLine[2]);
	let grid = [];
	
	for(var i = 1; i <= numRows; ++i) {
            grid.push(lines[i]);
    }
//	console.log("grid");
//	console.log(grid);
//	console.log(grid[0][2]==grid[0][3]);
//	console.log(grid[0][2]);
//	console.log(grid[0][3]);
	nextMove(numRows,numColumns,numColors,grid);
} 

function nextMove(numRows,numColumns,numColors,grid) {
	let longestCol = findLongestContigousColumns(numRows,numColumns,numColors,grid);
	console.log(longestCol[0][0],longestCol[0][1]);
	
}


//find the longest contiguous columns and return array of points of the columns
function findLongestContigousColumns(numRows,numColumns,numColors,grid){
	
	let longestCol = [];
	//for each column
	for (let col = 0; col < numColumns; col++) {
		
		
		let groupForColumn = [];
		let oneGroup = [];
		//for each rows
		for (let row = 0; row < numRows; row++) {
			
			if (row === 0 && grid[row][col] !== '-') {			// first row
				oneGroup.push([row,col]);
			} else if (row !== numRows -1 && grid[row][col] !== '-') {			// if first row < Rows < last row
				if (grid[row][col] === grid[row-1][col]) {     // if color is the same for current point and prev point in the same column
					oneGroup.push([row,col]);										// add the current point to the group
				} else {										// if color is different for current point and prev point
					if (oneGroup.length !== 0) {
						groupForColumn.push(oneGroup);
						longestCol = findLongest(longestCol,oneGroup);
						//console.log("groupForColumn.push(oneGroup)",oneGroup);
					}
						oneGroup = [];							// add the prev oneGroup to result. and start and new oneGroup
						oneGroup.push([row,col]);	
					
				}											 
			} else if (grid[row][col] !== '-') {				// last row
				if (grid[row][col] === grid[row-1][col]) {   // same color with prev point
					oneGroup.push([row,col]);  
					groupForColumn.push(oneGroup);         // put the last group to the array of groups.
					longestCol = findLongest(longestCol,oneGroup);
					oneGroup = [];
				} else {                                   // different color with prev point
					groupForColumn.push(oneGroup);			// push prev oneGroup to the array of groups
					longestCol = findLongest(longestCol,oneGroup);
					oneGroup = [];
					
					oneGroup.push([row,col]);
					groupForColumn.push(oneGroup);			// push current point to the array of groups
					longestCol = findLongest(longestCol,oneGroup);
					oneGroup = [];
					
				}
			}
			//console.log("groupForColumn: ",groupForColumn);
			
		}
		
	}
	return longestCol;
}

function findLongest(longestCol,oneGroup) {
	let longest = longestCol;
	//console.log("longestCol: ",longestCol);
	//console.log("oneGroup: ",oneGroup);
	if (longest.length < oneGroup.length) {
		longest = oneGroup;
	}
	
	return longest;
}
//find the longest contigous rows and return array of points of the rows
function findLongestContigousRows (numRows,numColumns,numColors,grid){

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