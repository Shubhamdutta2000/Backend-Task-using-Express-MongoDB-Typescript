//-------------------- Problem --------------------------------//
// Create a program (any language) that implements two functions
//     1. addScore(score)
//         a. Add score to the list
//     2. getAverage() returns avg
//         a. Gives the avg, logic to calculate avg is as follows
//         b. If number of scores is 0 then return null/undefined
//         c. If number of scores <= 2 then return avg of all
//         d. If number of score > 2 then return avg excluding min and max


//-------------------- Solution --------------------------------//

let listOfScores = []

const addScore = (score) => {
    listOfScores.push(score)
}

const getAverage = () => {
    // edge cases
    if (listOfScores.length == 0) {
        return null
    }
    if (listOfScores.length <= 2) {
        let sum = 0
        listOfScores.map((score, index) => {
            sum += score
        })
        let avg = sum / listOfScores.length;
        return avg
    }

    // length of listOfScores > 2 (then exclude min and max no. from the list)

    // exclude min and max elements from the list
    const scoresExcludingMinMax = listOfScores.filter((score) => {
        if (score !== Math.min(...listOfScores) && score !== Math.max(...listOfScores)) {
            return score
        }
    })

    // find avg in the list of scores exclusidng min max
    let sum = 0
    scoresExcludingMinMax.map((score, index) => {
        sum += score
    })
    let avg = sum / scoresExcludingMinMax.length;
    return avg
}

console.log(listOfScores); // []
console.log(getAverage()) // → null
console.log("------------------------------------------");


addScore(2)
console.log(listOfScores); // [2]
console.log(getAverage()) // → 2
console.log("------------------------------------------");

addScore(3)
console.log(listOfScores); // [2, 3]
console.log(getAverage()) // → 2.5
console.log("------------------------------------------");


addScore(5)
console.log(listOfScores); // [2, 3, 5]
console.log(getAverage()) // → 3 (3 / 1)
console.log("------------------------------------------");

addScore(1)
console.log(listOfScores); // [2, 3, 5, 1]
console.log(getAverage()) // → 2.5
console.log("------------------------------------------");
