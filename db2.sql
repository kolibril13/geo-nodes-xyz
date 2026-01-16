CREATE TABLE IF NOT EXISTS usersy (
user_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
username varchar(50) NOT NULL UNIQUE,
email varchar(255) NOT NULL UNIQUE,
name varchar(30) NOT NULL
);


INSERT INTO usersy (username, email, name) 
VALUES ('Calcursssdsddasdd', 'helddddssffdlo@email.com' , 'Bernd');

INSERT INTO usersy (username, email, name)
VALUES ('jo', 'a', 'b');
