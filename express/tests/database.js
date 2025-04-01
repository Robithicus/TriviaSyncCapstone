import * as database from "../database.js"

//actual tests below
function getQuestionsTest() {
    database.getQuestions("TES", 3).then((result) => {
        console.log(result)
    })
}

function submitScoreTest() { //tests for parseName() as well
    let testName = "Test''';\_"
    let testScore = 1

    database.submitScore(testName, testScore)
    console.log("finished score!")
}

//test output
getQuestionsTest()
submitScoreTest()

