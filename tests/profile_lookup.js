//Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(name, prop){
// Only change code below this line
    var id = -1;   // location of the array with the matching name
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i]["firstName"] === name) {
            id = i;
            break;
        }
    }

    if (id === -1) {
        return "No such contact";
    } else if (!contacts[i].hasOwnProperty(prop)) {
        return "No such property"
    } else {
        return contacts[i][prop];
    }
    
// Only change code above this line
}

// Change these values to test your function
lookUpProfile("Akira", "likes");