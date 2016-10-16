CREATE TABLE `OUWXC`.`Roles` (
  
	`Role` VARCHAR(45) NOT NULL,
  
	`Read Access` BINARY(1) NULL,
  
	`Write Access` BINARY(1) NULL,
  
	`Admin Access` BINARY(1) NULL DEFAULT False,
  
	PRIMARY KEY (`Role`));