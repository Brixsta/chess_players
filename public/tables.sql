DROP DATABASE IF EXISTS chess_players;

CREATE DATABASE chess_players;

DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS countries ;

CREATE TABLE countries
(
    countryName TEXT, 
    countryId INTEGER PRIMARY KEY
);

CREATE TABLE players 
(
    firstName TEXT,
    lastName TEXT,
    playerId INTEGER,
    countryId INTEGER REFERENCES countries (countryId)
);


-- add values into countries table////////////////////////////////////////////////////////////
INSERT INTO countries (countryName, countryId) VALUES ('United States',222);
INSERT INTO countries (countryName, countryId) VALUES ('Russia',333);
INSERT INTO countries (countryName, countryId) VALUES ('India',444);
INSERT INTO countries (countryName, countryId) VALUES ('Germany',555);
INSERT INTO countries (countryName, countryId) VALUES ('Cuba',666);
INSERT INTO countries (countryName, countryId) VALUES ('Norway',777);
INSERT INTO countries (countryName, countryId) VALUES ('Austria',888);

-- add values into players table/////////////////////////////////////////////////////////////
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Paul', 'Morphy', 1, 222);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Tigran', 'Petrosian', 2, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Viswanathan', 'Anand', 3, 444);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Alexander', 'Alekhine', 4, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Mikhail', 'Tal', 5, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Emanuel', 'Lasker', 6, 555);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Vladimir', 'Kramnik', 7, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Mikhail', 'Botvinnik', 8, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Anatoly', 'Karpov', 9, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Jose', 'Capablanca', 10, 666);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Bobby', 'Fischer', 11, 222);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Magnus', 'Carlsen', 12, 777);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Wilhelm', 'Steinitz', 13, 888);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Gary', 'Kasparov', 14, 333);
INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ('Joshua', 'Waitzkin', 15, 222);

