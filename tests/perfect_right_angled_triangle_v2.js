function processData(input) {
    let lines = input.split('\n');
    let numQuery = lines[0];

    //output: How many perfect right-angled triangles (c < upperBound) exist that are not super-perfect?
    for (let i = 1; i <= numQuery; i++ ) {
        let upperBound = lines[i];
        let result = perfectRightAngledTriangle(upperBound);
        
        //test
        console.log(result);
        let countResult = 0;
        for (let j = 0; j < result.length; j++) {
            if (result[j][3] === false) {
                countResult += 1;
            }
        }
        //print result
        console.log(countResult);
    }


    // perfectRightAngledTriangle function returns perfect Right Angled Triangle in array of arrays [[7,24,25,true]]
    // where the 4th element in the return array is true if it's super-perfect Right Angled Triangle or false if not.
    function perfectRightAngledTriangle(upperBound) {
        let candidateTriangles =[];
        let result = [];
        let isSuper = false;
        for (let i = 1; i <= upperBound; i++) {
            for (let j = i; j <= upperBound; j++) {
                if (gcd(i,j) !==1) {
                    continue;
                }
                
                squareOfK = Math.floor(Math.sqrt(j));
                k = squareOfK * squareOfK;
                while ( k <= Math.min(upperBound, i+j)) {
                    //triangle condition
                    if (i>=j+k) {
                        squareOfK++;
                        k = squareOfK * squareOfK;
                        continue;
                    }
                    if (j>=i+k) {
                        squareOfK++;
                        k = squareOfK * squareOfK;
                        continue;
                    }
                    
                    if (gcd(j,k) !==1) {
                        squareOfK++;
                        k = squareOfK * squareOfK;
                        continue;
                    }
        // condition 1: it is a primitive right angled triangle.  a) right angled triangle. b) gcd(a,b)=1 and gcd(b,c)=1
        // condition 2: its hypotenuse is a perfect square <= already satisfied.
                                    
                    if ( isRightAngledTriangle(i,j,k)) {
                        // condition for super: its area is a multiple of the perfect numbers 6 and 28.
                        if (isAreaMultipleof6and28(i,j,k)) {
                            result.push([i,j,k,true]);    
                        } else {
                            result.push([i,j,k,false]); 
                        }
                    }
                    squareOfK++;
                    k = squareOfK * squareOfK;
                }
                
            }
        }
        return result;
    }
    
} 

//function defitions in the below.
    
const gcd = function(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
};
    
const isRightAngledTriangle = (a,b,c) => Math.pow(a,2) + Math.pow(b,2) === Math.pow(c,2);
const isHypotenuseSquare = (c) => Math.floor(Math.sqrt(c)) === Math.sqrt(c);
const isAreaMultipleof6and28 = (a,b,c) => (a * b / 2) % 6 === 0 && (a * b / 2) % 28 === 0;
 
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
