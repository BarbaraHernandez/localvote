USE vote_db;

CREATE TABLE Posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    body TEXT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Posts (title, body) VALUES ('Mandatory Dog Ownership', 'All residents must own at least one dog or financially support one shelter dog.');

INSERT INTO Posts (title, body) VALUES ('Open Container', 'We should allow open containers in the downtown are so folks can drink in the park.');