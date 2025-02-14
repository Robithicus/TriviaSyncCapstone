export function score(submissions, answers) { // return int score, currently 1 point for each correct answer
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
    return parse(submission) == parse(answer)
}

function parse(s) { // return string submission, remove whitespace, 'the', 'a', make lowercase
    let removeWords = ["the", "a"]
    let removeEnders = [".", "!"]
    
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