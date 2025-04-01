import mysql from "mysql2/promise"
import conf from "./database.json" with { type: "json" }
import { Question } from "./questionData.js"

async function getConnection() {
    const connection = await mysql.createConnection({
        host: conf.host,
        port: conf.port,
        user: conf.user,
        password: conf.password,
        database: conf.database,
    })

    return connection
}

export async function getQuestions(category, amount) {
    // category = category.toUpperCase()
    // if (category.length > 3) {
    //     category = category.substring(0,3)
    // } else if (category.length < 3) {
    //     //throw new Error("Category Title too short")
    //     console.log(`Category Title ${category} Too Short`)
    //     return null
    // }

    // try {
    //     const [results, fields] = await connection.query(
    //         `SELECT * FROM Questions WHERE id LIKE '${category}%' ORDER BY RAND() LIMIT ${amount}`
    //     );
    //     connection.close()

    //     let retVal = [[],[]]
    //     results.forEach(element => {
    //         let question = element.question
    //         let answer = element.answer
    //         retVal[0].push(question)
    //         retVal[1].push(answer)
    //     });
    //     return retVal
    // } catch (err) {
    //     console.log(err)
    //     connection.close()
    //     return null
    // }

    const categories = ["Geography", "Science", "Pop Culture", "History", "Sports"]

    const questions = []

    for (let i = 0; i < categories.length; i++) {
        const connection = await getConnection()
        
        try {
            const [results, fields] = await connection.query(
                `SELECT * FROM Questions WHERE category = '${categories[i]}' ORDER BY RAND() LIMIT 1` 
            );
            
            connection.close()

            results.forEach(element => {
                let question = element.question
                let answer = element.answer
                let choice1 = element.choice1 //need to wait for actual name once implemented
                let choice2 = element.choice2 //need to wait for actual name once implemented
                let choice3 = element.choice3 //need to wait for actual name once implemented
                let category = element.category
                questions.push(new Question(question,answer,[choice1,choice2,choice3],category))
            });

        } catch (err) {
            connection.close()
            console.log(err)
            return []
        }
    }

    return questions

    // categories.forEach(async category =>{
    //     console.log("test")
    //     const connection = await getConnection()
    //     console.log("test1")
        
    //     try {
    //         const [results, fields] = await connection.query(
    //             `SELECT * FROM Questions WHERE category = '${category}' ORDER BY RAND() LIMIT 1` 
    //         );
            
    //         connection.close()

    //         results.forEach(element => {
    //             let question = element.question
    //             let answer = element.answer
    //             let choice1 = element.choice1 //need to wait for actual name once implemented
    //             let choice2 = element.choice2 //need to wait for actual name once implemented
    //             let choice3 = element.choice3 //need to wait for actual name once implemented
    //             let category = element.category
    //             questions.push(new Question(question,answer,[choice1,choice2,choice3],category))
    //         });

    //         console.log(questions)
    //         return questions

    //     } catch (err) {
    //         console.log(err)
    //         connection.close()
    //         return null
    //     }
    // });
}

export async function submitScore(name, score) {
    const connection = await getConnection()

    name = nameParse(name)

    try {
        await connection.query(
            `INSERT INTO Scores (username,score) VALUES ('${name}', '${score}')`
        )
        connection.close()
        return 0
    } catch (err) {
        console.log(err)
        connection.close()
        return -1
    }
}

export async function getPosition(name, score) {
    const connection = await getConnection()

    name = nameParse(name)

    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM Scores`
        )
        connection.close()
        return results.findIndex(l => l.username == name && l.score == score) + 1
    }
    catch (err) {
        console.log(err)
        connection.close()
        return -1
    }
}

export async function getScores(limit = 100) {
    const connection = await getConnection()

    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM Scores ORDER BY score DESC LIMIT ${limit}`
        );
        connection.close()
        return results
    } catch (err) {
        console.log(err)
        connection.close()
        return null
    }
}

function nameParse(name) {
    // take name, check for symbols, remove dangerous ones, and return new name
    //should remove ;, ', \, and _
    return name.replace(/[';\\_]/g, '')
}
