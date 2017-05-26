CREATE DATABASE  IF NOT EXISTS `OhioPerformanceProgram` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `OhioPerformanceProgram`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: ouwxc.cevwncmpvhyl.us-west-2.rds.amazonaws.com    Database: PPA
-- ------------------------------------------------------
-- Server version	5.6.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Health`
--

DROP TABLE IF EXISTS `Health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Health` (
  `hid` int(11) NOT NULL AUTO_INCREMENT,
  `health` varchar(45) NOT NULL,
  PRIMARY KEY (`hid`),
  UNIQUE KEY `hid_UNIQUE` (`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Health`
--

LOCK TABLES `Health` WRITE;
/*!40000 ALTER TABLE `Health` DISABLE KEYS */;
/*!40000 ALTER TABLE `Health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hunger`
--

DROP TABLE IF EXISTS `Hunger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hunger` (
  `hungerid` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`hungerid`),
  UNIQUE KEY `hungid_UNIQUE` (`hungerid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hunger`
--

LOCK TABLES `Hunger` WRITE;
/*!40000 ALTER TABLE `Hunger` DISABLE KEYS */;
/*!40000 ALTER TABLE `Hunger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Injury`
--

DROP TABLE IF EXISTS `Injury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Injury` (
  `Injid` int(11) NOT NULL AUTO_INCREMENT,
  `injury` varchar(45) NOT NULL,
  PRIMARY KEY (`Injid`),
  UNIQUE KEY `Injid_UNIQUE` (`Injid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Injury`
--

LOCK TABLES `Injury` WRITE;
/*!40000 ALTER TABLE `Injury` DISABLE KEYS */;
/*!40000 ALTER TABLE `Injury` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RPE`
--

DROP TABLE IF EXISTS `RPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RPE` (
  `RPEid` int(11) NOT NULL AUTO_INCREMENT,
  `RPE` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`RPEid`),
  UNIQUE KEY `RPEid_UNIQUE` (`RPEid`),
  UNIQUE KEY `RPE_UNIQUE` (`RPE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RPE`
--

LOCK TABLES `RPE` WRITE;
/*!40000 ALTER TABLE `RPE` DISABLE KEYS */;
/*!40000 ALTER TABLE `RPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RPEinfo`
--

DROP TABLE IF EXISTS `RPEinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RPEinfo` (
  `RPEinfoid` int(11) NOT NULL AUTO_INCREMENT,
  `RPEinfo` varchar(45) NOT NULL,
  PRIMARY KEY (`RPEinfoid`),
  UNIQUE KEY `RPEinfoid_UNIQUE` (`RPEinfoid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RPEinfo`
--

LOCK TABLES `RPEinfo` WRITE;
/*!40000 ALTER TABLE `RPEinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `RPEinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Roles` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `rid_UNIQUE` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Admin'),(2,'Coach'),(3,'Athlete');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Surface`
--

DROP TABLE IF EXISTS `Surface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Surface` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `surface` varchar(45) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `sid_UNIQUE` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Surface`
--

LOCK TABLES `Surface` WRITE;
/*!40000 ALTER TABLE `Surface` DISABLE KEYS */;
INSERT INTO `Surface` VALUES (1,'Track');
/*!40000 ALTER TABLE `Surface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teams`
--

DROP TABLE IF EXISTS `Teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teams` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(45) NOT NULL,
  `sport` varchar(45) NOT NULL,
  `gender` enum('M','F','A') NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tid_UNIQUE` (`tid`),
  UNIQUE KEY `team_name_UNIQUE` (`team_name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teams`
--

LOCK TABLES `Teams` WRITE;
/*!40000 ALTER TABLE `Teams` DISABLE KEYS */;
INSERT INTO `Teams` VALUES (1,'OUWXC','Cross Country','F'),(7,'CS','Competitive Solitaire','M'),(21,'UE','UAT','');
/*!40000 ALTER TABLE `Teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `first` varchar(45) DEFAULT NULL,
  `last` varchar(45) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `passflag` enum('T','F') DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'brent','$2a$10$uKfEgXm71PLASuwlWclnYeDpZBp6LHiEaWQF9pBUtyD60yh3g8tqS','email@email.com','brent','gruber',1,'2017-02-20 03:37:03','F'),(10,'roberto','$2a$10$msVET2xM8wt02BqJdMg/1OdF8yqz3LoKp/Hw.LQungkVl9RcouQeK','robbie.whitmer@gmail.com','Robert','Whitmer',1,'2017-02-26 01:53:00','F'),(14,'Cleviden','$2a$10$9MqeyVRyfL0qQZtEDf6SqOvDhqg1oHB593in8K3cQmxs93cp3ngmy','Clevidence@Ohio.edu','Michael','Clevidence',1,'2017-03-03 01:48:47','F'),(20,'JYoYO','$2a$10$9I.30kBKqRInpkS48WQ5WO.1SnuNGcpa55fSKltdKmU0BCgL4sfYu','yoderj@ohio.edu','Jen','Yoder',3,'2017-03-04 20:03:14','F'),(21,'Clev','$2a$10$4Kio4gecPYljMtMSQ2fVzu3QuVKfDA1H5Nnd7AEGMwL4fx1Ie2vo6','cleviden@ohio.edu','Mike','Clevidence',3,'2017-03-04 20:03:59','F'),(40,'jeffdunham','$2a$10$gltVYik3oviXuloMXTW/ouK/HZlPV/0H6wfz17RlkEQ5mYtq2QwsO','puppet@gmail.com','jeff','dunham',3,'2017-03-23 22:17:52','T'),(42,'johnsmith','$2a$10$mKS23vZyi4xJ/dFQi1YAVuuWhWPeFDjWORhG/1ffubTRKZtMMosdC','john@email.com','john','smith',3,'2017-03-23 22:24:15','T'),(43,'Admin','$2a$10$CobV8LMha3FKtCCCsQIoWuX4RJE6ShgZnKt1vVbGbyTdCB4q/KPfi','admin@ppa.com','witty','pun',1,'2017-03-23 23:40:58','F'),(93,'UE','$2a$10$Twv.z/S/RtmRPtNbpF7/MeToUR7nCfeTc0dzQZVZSjY6wnW6JMDjO','UserExperience@PPA.com','User','Experience',1,'2017-03-29 14:04:12','T'),(94,'ue_admin','$2a$10$lJpJhdTqCvBuxojRAexaCukFp47SWnflSDn6T7wrH9kmNpZvMDb4y','test','test','test',1,'2017-03-31 00:30:26','F'),(95,'user1','$2a$10$G.xB1W7xQadHHxHEH89KqOLyH4JUhj9Xy5uf9HkYREEjDBQqJLOdy','dontknow','user','one',3,'2017-03-31 00:31:50','T'),(98,'user2','$2a$10$EgAP4.DS4R6k4pf4N9jsrOFCUI8zr1z4DzwSv85CuvJSMvC5ymg0e','dontknow2','user','two',3,'2017-03-31 00:32:56','T');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Teams`
--

DROP TABLE IF EXISTS `User_Teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`tid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Teams`
--

LOCK TABLES `User_Teams` WRITE;
/*!40000 ALTER TABLE `User_Teams` DISABLE KEYS */;
INSERT INTO `User_Teams` VALUES (6,21,1),(7,20,1),(53,48,7),(58,85,7),(68,95,21),(69,98,21),(70,94,21),(71,11,7),(73,1,1),(74,93,21),(76,99,21),(78,10,22),(79,10,23);
/*!40000 ALTER TABLE `User_Teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Workouts`
--

DROP TABLE IF EXISTS `Workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Workouts` (
  `wid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `sleep` float DEFAULT NULL,
  `health` varchar(45) DEFAULT NULL,
  `injury` varchar(45) DEFAULT NULL,
  `percent_health` varchar(45) DEFAULT NULL,
  `cycle_start` varchar(45) DEFAULT NULL,
  `RPE` varchar(45) DEFAULT NULL,
  `RPEInfo` varchar(45) DEFAULT NULL,
  `time` float DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `hunger` varchar(45) DEFAULT NULL,
  `notes` longtext,
  PRIMARY KEY (`wid`),
  UNIQUE KEY `wid_UNIQUE` (`wid`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Workouts`
--

LOCK TABLES `Workouts` WRITE;
/*!40000 ALTER TABLE `Workouts` DISABLE KEYS */;
INSERT INTO `Workouts` VALUES (2,1,'2017-02-20 00:00:00',5,'healthy','injured','20','yes','6','sprint/interval',30,2,'10','This is a note'),(3,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(4,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(5,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(6,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(7,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(8,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(9,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(10,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(11,1,'2017-02-20 00:00:00',3,'healthy','injured','75%','yes','6','zone 1',30,2,'3','This is a note'),(12,1,'2017-02-20 00:00:00',10,'healthy','injured','75%','yes','6','unknown',30,2,'10','DId it break?'),(19,10,'2017-02-28 00:00:00',13,'n/a','n/a','100','no','11','unknown',15,1,'10',''),(20,10,'2017-03-02 00:00:00',12,'n/a','n/a','100','no','13','aerobic',30,3,'5',''),(22,14,'2017-03-04 00:00:00',9,'n/a','n/a','90','no','12','aerobic',78,23,'4',''),(23,21,'2017-03-04 00:00:00',9,'n/a','n/a','90','no','11','aerobic',78,23,'4',''),(24,20,'2017-03-04 00:00:00',8,'chronic soreness','it band','80','no','13','aerobic',120,11,'5',''),(25,21,'2017-03-04 00:00:00',0,'undefined','undefined','undefined','no','12','strengthandconditioning',30,0,'undefined','undefined'),(26,20,'2017-03-05 00:00:00',8,'chronic soreness','it band','60','no','15','crosstraining',120,0,'8','Interval cycling, zero appetite afterwards. '),(27,21,'2017-03-05 00:00:00',7,'n/a','n/a','90','no','11','aerobic',250,70,'5',''),(28,20,'2017-03-06 00:00:00',8,'chronic soreness','it band','60','no','12','aerobic',120,11.5,'8','Right IT band tightness, periodic stretching during run helps. Mike 11, left Achilles pain onset. Glut soreness. '),(29,14,'2017-03-08 00:00:00',8,'n/a','n/a','','no','rpeinvalid','aerobic',0,0,'unknown',''),(30,21,'2017-03-08 00:00:00',8,'n/a','low back','90','no','13','aerobic',258,70,'4',''),(31,21,'2017-03-09 00:00:00',6,'insomnia','low back','70','no','15','aerobic',258,68,'5',''),(32,21,'2017-03-10 00:00:00',9,'chronic soreness','low back','70','no','13','strengthandconditioning',45,0,'5',''),(33,21,'2017-03-11 00:00:00',9,'decreased motivation','n/a','90','no','13','strengthandconditioning',45,0,'3',''),(34,20,'2017-03-11 00:00:00',8,'chronic soreness','hip','75','no','13','aerobic',105,11.5,'8',''),(35,10,'2017-03-12 00:00:00',12,'n/a','n/a','100','no','12','unknown',12,1,'10',''),(36,21,'2017-03-12 00:00:00',8,'decreased motivation','n/a','90','no','11','aerobic',108,24,'3',''),(38,21,'2017-03-13 00:00:00',8,'chronic soreness','low back','','no','13','strengthandconditioning',45,0,'4',''),(39,21,'2017-03-13 00:00:00',0,'undefined','undefined','undefined','no','9','aerobic',30,0,'undefined','undefined'),(40,22,'2017-03-15 00:00:00',11,'gi_distress','shin','40','no','8','interval',17,15,'2',''),(41,20,'2017-03-15 00:00:00',7,'n/a','n/a','80','no','15','crosstraining',80,0,'3','Cross training in addition to running, 30 minutes interval cycling, 20 minutes interval elliptical '),(42,21,'2017-03-15 00:00:00',7,'chronic soreness','low back','80','no','12','aerobic',60,0,'6','Low back pain after lifting.  Result of beny over rows. '),(47,10,'2017-03-14 00:00:00',12,'n/a','n/a','100','no','13','aerobic',16,2,'3','dwrfgsdfgsdfg'),(48,21,'2017-03-16 00:00:00',8,'muscle soreness','low back','60','no','12','aerobic',60,18,'unknown',''),(49,21,'2017-03-17 00:00:00',7,'muscle soreness','low back','70','no','13','strengthandconditioning',40,0,'6',''),(50,21,'2017-03-18 00:00:00',8,'muscle soreness','low back','70','no','13','aerobic',158,45,'5','Legs are heavy. Lifting? Or workload?'),(51,21,'2017-03-19 00:00:00',11,'abnormal fatigue','thigh','90','no','13','aerobic',200,70,'5',''),(52,21,'2017-03-22 00:00:00',6,'abnormal fatigue','n/a','80','no','9','aerobic',115,27,'5',''),(53,21,'2017-03-21 00:00:00',8,'muscle soreness','n/a','90','no','17','threshold',122,30,'5',''),(54,10,'2017-03-22 00:00:00',13,'n/a','n/a','100','no','14','aerobic',26,3,'unknown',''),(55,10,'2017-03-23 00:00:00',13,'n/a','n/a','100','no','13','unknown',26,3,'10','asdasd'),(56,10,'2017-03-21 00:00:00',17,'headache','n/a','100','no','11','aerobic',12,1,'unknown',''),(57,21,'2017-03-23 00:00:00',8,'muscle soreness','thigh','80','no','12','aerobic',87,21,'5',''),(58,21,'2017-03-25 00:00:00',8,'muscle soreness','thigh','80','no','15','aerobic',257,75,'3',''),(59,21,'2017-03-27 00:00:00',9,'muscle soreness','thigh','70','no','13','aerobic',100,24,'5',''),(60,21,'2017-03-27 00:00:00',0,'undefined','undefined','undefined','no','14','resistance',20,0,'undefined',''),(62,21,'2017-03-24 00:00:00',7,'n/a','n/a','90','no','11','aerobic',80,20,'5',''),(63,21,'2017-03-28 00:00:00',8,'abnormal fatigue','n/a','70','no','12','aerobic',100,24,'7',''),(64,21,'2017-03-29 00:00:00',9,'muscle soreness','thigh','70','no','18','sprint/interval',100,30,'7',''),(65,94,'2017-03-30 00:00:00',6,'n/a','n/a','100','no','13','unknown',10,1,'5','robbie is a bean'),(66,94,'2017-03-29 00:00:00',7,'n/a','n/a','100','no','13','unknown',14,1,'5',''),(67,94,'2017-03-28 00:00:00',6,'n/a','n/a','100','no','15','unknown',24,2,'5',''),(68,94,'2017-03-27 00:00:00',7,'n/a','n/a','100','no','11','unknown',15,1,'5',''),(69,94,'2017-03-26 00:00:00',5,'n/a','n/a','100','no','14','unknown',20,2,'5',''),(70,21,'2017-03-30 00:00:00',8,'abnormal fatigue','thigh','80','no','12','aerobic',84,24,'6',''),(71,99,'2017-04-06 00:00:00',8,'n/a','n/a','100','no','rpeinvalid','crosstraining',30,800,'7','This allows us to take notes'),(72,99,'2017-04-05 00:00:00',2,'insomnia','head','100','no','11','resistance',450,1,'0','Notey McNoteFace'),(75,99,'2017-04-04 00:00:00',23,'n/a','foot','70','no','19','aerobic',60,6,'5','I feel great but my foot had some pain'),(76,99,'2017-04-03 00:00:00',8,'n/a','n/a','100','no','10','crosstraining',45,5,'3','I saw a turtle while running today'),(77,21,'2017-04-11 00:00:00',7,'muscle soreness','low back','30','no','9','aerobic',60,10,'5',''),(78,21,'2017-04-12 00:00:00',5,'muscle soreness','low back','40','no','10','aerobic',120,24,'6',''),(79,21,'2017-04-13 00:00:00',8,'n/a','low back','50','no','rpeinvalid','aerobic',90,7,'9',''),(80,21,'2017-04-15 00:00:00',7,'n/a','low back','60','no','18','aerobic',70,24,'7',''),(81,21,'2017-04-16 00:00:00',4,'n/a','mid back','80','no','15','aerobic',45,12,'5',''),(82,21,'2017-04-15 00:00:00',0,'undefined','undefined','undefined','no','9','aerobic',25,10,'undefined',''),(89,1,'2017-01-13 00:00:00',8,'headache','calf','100','no','10','sprint/interval',70,6,'5',''),(91,10,'2017-04-19 00:00:00',13,'n/a','n/a','100','no','12','aerobic',24,3,'5','hello'),(92,10,'2017-04-19 00:00:00',0,'undefined','undefined','undefined','no','15','aerobic',14,1,'undefined','second workout');
/*!40000 ALTER TABLE `Workouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `team_view`
--

DROP TABLE IF EXISTS `team_view`;
/*!50001 DROP VIEW IF EXISTS `team_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `team_view` AS SELECT 
 1 AS `uid`,
 1 AS `username`,
 1 AS `first`,
 1 AS `last`,
 1 AS `tid`,
 1 AS `team_name`,
 1 AS `sport`,
 1 AS `gender`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_view`
--

DROP TABLE IF EXISTS `user_view`;
/*!50001 DROP VIEW IF EXISTS `user_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `user_view` AS SELECT 
 1 AS `uid`,
 1 AS `username`,
 1 AS `password`,
 1 AS `email`,
 1 AS `first`,
 1 AS `last`,
 1 AS `role_name`,
 1 AS `passflag`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `workout_view`
--

DROP TABLE IF EXISTS `workout_view`;
/*!50001 DROP VIEW IF EXISTS `workout_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `workout_view` AS SELECT 
 1 AS `wid`,
 1 AS `uid`,
 1 AS `userid`,
 1 AS `username`,
 1 AS `team_name`,
 1 AS `date`,
 1 AS `sleep`,
 1 AS `health`,
 1 AS `injury`,
 1 AS `percent_health`,
 1 AS `cycle_start`,
 1 AS `RPE`,
 1 AS `RPEinfo`,
 1 AS `time`,
 1 AS `distance`,
 1 AS `hunger`,
 1 AS `notes`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'PPA'
--

--
-- Dumping routines for database 'PPA'
--

--
-- Final view structure for view `team_view`
--

/*!50001 DROP VIEW IF EXISTS `team_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `team_view` AS select `a`.`uid` AS `uid`,`b`.`username` AS `username`,`b`.`first` AS `first`,`b`.`last` AS `last`,`a`.`tid` AS `tid`,`c`.`team_name` AS `team_name`,`c`.`sport` AS `sport`,`c`.`gender` AS `gender` from ((`User_Teams` `a` join `User` `b` on((`a`.`uid` = `b`.`uid`))) join `Teams` `c` on((`a`.`tid` = `c`.`tid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_view`
--

/*!50001 DROP VIEW IF EXISTS `user_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `user_view` AS select `a`.`uid` AS `uid`,`a`.`username` AS `username`,`a`.`password` AS `password`,`a`.`email` AS `email`,`a`.`first` AS `first`,`a`.`last` AS `last`,`b`.`role_name` AS `role_name`,`a`.`passflag` AS `passflag` from (`User` `a` join `Roles` `b` on((`a`.`rid` = `b`.`rid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `workout_view`
--

/*!50001 DROP VIEW IF EXISTS `workout_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `workout_view` AS select `a`.`wid` AS `wid`,`a`.`uid` AS `uid`,`b`.`uid` AS `userid`,`b`.`username` AS `username`,`c`.`team_name` AS `team_name`,`a`.`date` AS `date`,`a`.`sleep` AS `sleep`,`a`.`health` AS `health`,`a`.`injury` AS `injury`,`a`.`percent_health` AS `percent_health`,`a`.`cycle_start` AS `cycle_start`,`a`.`RPE` AS `RPE`,`a`.`RPEInfo` AS `RPEinfo`,`a`.`time` AS `time`,`a`.`distance` AS `distance`,`a`.`hunger` AS `hunger`,`a`.`notes` AS `notes` from ((`User` `b` join `Workouts` `a` on((`a`.`uid` = `b`.`uid`))) left join `team_view` `c` on((`a`.`uid` = `c`.`uid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-26 15:42:14
