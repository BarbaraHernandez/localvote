USE vote_db;

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    policyDetail TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY(id)
);

CREATE TABLE counts(
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    choice TINYINT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
