CREATE DATABASE studentdb;
CREATE TABLE tblstudents (
	
	studentid int NOT NULL AUTO_INCREMENT,
	lastname varchar(255) NOT NULL,
	firstname varchar(255) NOT NULL,
	middlename varchar(255) NOT NULL,
	course varchar(255) NOT NULL,
	birthplace varchar(255) NOT NULL,
	PRIMARY KEY (studentid)

)

