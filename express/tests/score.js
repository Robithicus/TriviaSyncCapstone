const scorejs = require("../score.js")

let failedTests = []
let testsRun = 0

function scoreTest(test, expected, submissions, answers) {
    testsRun++
    let actual = scorejs.score(submissions, answers)
    if (expected != actual) {
        failedTests.push(`${test}: Expected ${expected}, Actual ${actual}`)
    }
}

function scoreEmpty() { // test for empty submission
    let submissions = []
    let answers = []

    scoreTest("Score.js | Empty Test", -1, submissions, answers)
}

function scoreSize() { // test for different size submissions and answers
    let submissions = []
    let answers = []

    submissions.push("Size Difference") // push an extra item into one array

    submissions.push("data")
    answers.push("data")

    scoreTest("Score.js | Size Test", -1, submissions, answers)
}

function scoreTrim() { // test if starting words/enders mess up answers
    let submissions = []
    let answers = []

    submissions.push("the tower of awesome")
    answers.push("tower of awesome")

    submissions.push("cool leopards")
    answers.push("cool leopard")

    submissions.push("the universes!") // since I decided to parse both answer and submission I want to test it on both
    answers.push("the universes!") // also testing ender and plural and start

    scoreTest("Score.js | Start Test", 3, submissions, answers)
}

function scoreCase() { // test if upper/lower case mess up answers
    let submissions = []
    let answers = []

    submissions.push("AnSWeR")
    answers.push("Answer")

    scoreTest("Score.js | Case Test", 1, submissions, answers)
}

function scoreSpell() { // test if spelling mistakes mess up answers
    let submissions = []
    let answers = []

    submissions.push("answer")
    answers.push("anwser")

    submissions.push("kitten")
    answers.push("kitty")

    scoreTest("Score.js | Spell Test", 2, submissions, answers)
}

function scoreBasic() { // more realistic example
    let submissions = []
    let answers = []

    submissions.push("A big teddy bear") // case + A
    answers.push("Big Teddy Bear")

    submissions.push("Large Milk Shake") // A
    answers.push("A Large Milk Shake")

    submissions.push("meteor storms!") // plural + ender
    answers.push("Meteor Storm")

    submissions.push("unecesarily") // spelling + case
    answers.push("Unnecessarily")

    submissions.push("Abby Road!") // just a wrong answer
    answers.push("Boston Street")

    scoreTest("Score.js | Basic Test", 4, submissions, answers)
}

scoreEmpty()
scoreSize()
scoreTrim()
scoreCase()
scoreSpell()
scoreBasic()

console.log(`${testsRun} Tests Ran, ${failedTests.length} tests failed: `)
failedTests.forEach(test=> {
    console.log(test)
})