function processData(input) {
    let lines = input.split('\n');
    let numQuery = lines[0];

    //output: How many perfect right-angled triangles (c < upperBound) exist that are not super-perfect?
    for (let i = 1; i <= numQuery; i++ ) {
        let upperBound = lines[i];
        let result = perfectRightAngledTriangle(upperBound);
        
        //test
        //console.log(result);
        let countResult = 0;
        for (let j = 0; j < result.length; j++) {
            if (result[j][3] === false && result[j][4] === "perfect") {
                countResult += 1;
            }
        }
        //print result
        console.log(countResult);
    }


    // perfectRightAngledTriangle function returns perfect Right Angled Triangle in array of arrays
    // return: [[7,24,25,true/false,perfect/notChecked]]   
    //         
    //         4th element: true if its area is a multiple of the perfect numbers 6 and 28.
    //         
    //         5th element of true if it's perfect on top of false of 4th element.  Otherwise "notChecked".
    
    function perfectRightAngledTriangle(upperBound) {
        let candidateTriangles =[];
        let result = [];
        let isSuper = false;
        for (let i = 1; i <= upperBound; i++) {
            for (let ks = 1; ks <= Math.sqrt(upperBound); ks++) {    // condition 2.
                let k = ks * ks;
                let j = Math.sqrt(k*k - i*i);
                if (j<i) {                  // must be j >= i to eliminate the duplicate triangles.
                    continue;       
                }
                if (isAreaMultipleof6and28(i,j,k)) {
                    result.push([i,j,k,true,"notChecked"]);
                    continue;
                }
                //console.log(i,j,k, '---');
                if (Math.abs(Math.floor(j) - j) > 0.00000001) {     // right triangle.
                    continue;
                }

                //triangle condition
                if (i>=j+k) {
                    continue;
                }
                if (j>=i+k) {
                    continue;
                }
        // condition 1: it is a primitive right angled triangle.  a) right angled triangle. b) gcd(a,b)=1 and gcd(b,c)=1                    
                if (gcd(i,j) !==1) {     // condition 1.b.1.  gcd takes s a lot of iterations.          
                    continue;
                }
                if (gcd(j,k) !==1) {
                    continue;
                }
        // condition 2: its hypotenuse is a perfect square <= already satisfied.

                //console.log(i,j,k);                  
                // condition for super: its area is a multiple of the perfect numbers 6 and 28.
                if (!isAreaMultipleof6and28(i,j,k)) {
                    result.push([i,j,k,false,"perfect"]); 
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
    
//const isRightAngledTriangle = (a,b,c) => Math.pow(a,2) + Math.pow(b,2) === Math.pow(c,2);
//const isHypotenuseSquare = (c) => Math.abs(Math.floor(Math.sqrt(c)) - Math.sqrt(c)) < 0.00000001;
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
