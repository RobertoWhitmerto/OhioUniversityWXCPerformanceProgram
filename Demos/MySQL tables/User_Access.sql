CREATE TABLE `ouwxcpp_db`.`User_Access` (
  
	`User` INT NOT NULL,
  
	`Role` INT NULL COMMENT 
	'provides a link between user accounts and their respective roles',
  
	PRIMARY KEY (`User`));