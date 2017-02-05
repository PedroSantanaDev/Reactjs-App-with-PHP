DROP TABLE IF EXISTS CATS;
CREATE TABLE CATS(
   ID INT NOT NULL AUTO_INCREMENT,
   NAME VARCHAR (32) NOT NULL,
   AGE INT NOT NULL,
   OWNER VARCHAR (32) NOT NULL,  
   CATIMAGE VARCHAR (32) NOT NULL,
   PRIMARY KEY (ID)
);
INSERT INTO CATS VALUES (NULL, "Garfield", 4, "Larissa", "cat1.png");
INSERT INTO CATS VALUES (NULL, "Scruffles", 2, "Kevin", "cat2.png");
INSERT INTO CATS VALUES (NULL, "Felix", 5, "Jane", "cat3.png");
INSERT INTO CATS VALUES (NULL, "Mr. Bigglesworth", 3, "Jane", "cat4.png");
DROP TABLE IF EXISTS POSTS;
CREATE TABLE POSTS (
   ID INT NOT NULL AUTO_INCREMENT,
   CATID INT NOT NULL,
   BODY VARCHAR (256) NOT NULL,
   POSTTIME DATETIME NOT NULL,
   POSTIMAGE VARCHAR (32),
   PRIMARY KEY (ID)
);
INSERT INTO POSTS VALUES (NULL, 1, "Check out the new litterbox!", "2016-09-01 10:24:45", "update1.png");
INSERT INTO POSTS VALUES (NULL, 2, "Check out the new yarn!", "2016-09-02 5:45:23", "update2.png");
INSERT INTO POSTS VALUES (NULL, 3, "I made a new friend today!", "2016-09-01 14:45:23", "update3.png");
INSERT INTO POSTS VALUES (NULL, 4, "I made a mess today!", "2016-09-03 23:22:55", "update4.png");
INSERT INTO POSTS VALUES (NULL, 1, "Down with dogs!", "2016-09-06 05:24:22", "update5.png");
INSERT INTO POSTS VALUES (NULL, 2, "One day I'll catch him!", "2016-09-02 5:45:32", "update6.png");
INSERT INTO POSTS VALUES (NULL, 3, "Woah talk about a big cat!", "2016-09-03 02:14:55", "update7.png");
INSERT INTO POSTS VALUES (NULL, 4, "He wants to build a litterbox, and make the neighbour's cat pay for it!", "2016-09-05 12:56:20", "update8.png");