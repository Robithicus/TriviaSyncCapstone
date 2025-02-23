export function scoreSubmission(submissions, answers) { // return int score, currently 1 point for each correct answer
    let score = 0
    if (submissions.length == answers.length && submissions.length > 0 && answers.length > 0) { // assert that we have submissions to compare to each answer
        for (let i = 0; i < submissions.length; i++) {
            if (isCorrect(submissions[i], answers[i])) {
                score++;
            }
        }
        return score
    } else {
        return -1 // returning -1 to indicate there was an error, probably will never happen
    }
}

function isCorrect(submission, answer) { // return bool correct, placeholder
    // return parse(submission) == parse(answer)
    submission = parse(submission)
    answer = parse(answer)

    let levdist = levenshteinDistance(submission, answer)

    // compare lengths of strings?
    // base levensthein distance threshold on lenth of strings
    return levdist <= 2
}

function parse(s) { // return string submission, remove whitespace, 'the', 'a', make lowercase
    let removeWords = ["the", "a"]
    let removeEnders = [".", "!", "?"]
    
    s = s.trim()
    s = s.toLowerCase()
    removeWords.forEach(word => { // remove basic words
        if (s.startsWith(word)) {
            s = s.substring(word.length)
            s = s.trim()
        }
    });

    removeEnders.forEach(ender => { // remove unnecessary enders
        if (s.endsWith(ender)) {
            s = s.substring(0, s.length-1)
        }
    })

    if (s.endsWith("s")) { // remove unnecessary plurals
        s = s.substring(0, s.length-1)
    }

    return s
}

function levenshteinDistance(s1, s2) {
    let m = s1.length
    let n = s2.length

    let matrix = [[]]

    for (let i = 1; i <= m; i++) {
        matrix.push([i])
    }
    for (let j = 0; j <= n; j++) {
        matrix[0].push(j)
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                matrix[i].push(matrix[i-1][j-1])
            } else {
                let pushval = 1 + Math.min(matrix[i][j-1], Math.min(matrix[i-1][j], matrix[i-1][j-1]))
                matrix[i].push(pushval)
            }
        }
    }
    // printMatrix(matrix)
    return matrix[m][n]
}

function printMatrix(matrix) {
    let s = ""
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < 10) {
                s += ` ${matrix[i][j]}, `
            } else {
                s += `${matrix[i][j]}, ` 
            }
                       
        }
        s += "\n"
    }
    console.log(s)
}