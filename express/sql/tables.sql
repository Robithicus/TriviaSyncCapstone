CREATE TABLE Questions (
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    choice1 TEXT NOT NULL,
    choice2 TEXT NOT NULL,
    choice3 TEXT NOT NULL
);
CREATE TABLE Scores (
    username TEXT NOT NULL,
    score INT NOT NULL   
);