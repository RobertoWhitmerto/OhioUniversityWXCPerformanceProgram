CREATE TABLE `OUWXC`.`user` (
  
	`username` VARCHAR(16) NOT NULL,
  
	`email` VARCHAR(255) NULL,
  
	`password` VARCHAR(32) NOT NULL,
  
	`create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP);