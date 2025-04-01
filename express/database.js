import mysql from "mysql2/promise"
import conf from "./database.json" with { type: "json" }

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
    const connection = await getConnection()

    category = category.toUpperCase()
    if (category.length > 3) {
        category = category.substring(0,3)
    } else if (category.length < 3) {
        //throw new Error("Category Title too short")
        console.log(`Category Title ${category} Too Short`)
        return null
    }

    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM Questions WHERE id LIKE '${category}%' ORDER BY RAND() LIMIT ${amount}`
        );
        connection.close()

        let retVal = [[],[]]
        results.forEach(element => {
            let question = element.question
            let answer = element.answer
            retVal[0].push(question)
            retVal[1].push(answer)
        });
        return retVal
    } catch (err) {
        console.log(err)
        connection.close()
        return null
    }
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
