CREATE TABLE `ouwxcpp_db`.`athlete_data` (
  `athlete` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `sleep` FLOAT ZEROFILL NULL,
  `Illness` VARCHAR(45) NULL,
  `Injury` VARCHAR(45) NULL,
  `percent_health` VARCHAR(45) NULL,
  `cycle_start` DATETIME NULL,
  `notes` VARCHAR(140) NULL,
  PRIMARY KEY (`athlete`))
COMMENT = 'This table will house all data input by athletes';