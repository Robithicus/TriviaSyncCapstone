CREATE TABLE Questions (
    id VARCHAR(7) NOT NULL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);
CREATE TABLE Scores (
    username TEXT NOT NULL,
    score INT NOT NULL   
);