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
            `SELECT * FROM Questions WHERE id LIKE '${category}%'`
        );

        return results
    } catch (err) {
        console.log(err)
        return null
    }
}