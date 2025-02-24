-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: hr_helper
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `birthday` date NOT NULL,
  `position` int DEFAULT NULL,
  `join_date` date NOT NULL,
  `project` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_idx` (`project`),
  KEY `fk_employees_1_idx` (`position`),
  CONSTRAINT `positionID` FOREIGN KEY (`position`) REFERENCES `positions` (`id`),
  CONSTRAINT `projectID` FOREIGN KEY (`project`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (11,'John','Smith','john.smith@example.com','1234567890','New York','1990-05-15',1,'2020-01-10',1,'2023-08-30 10:34:27','2023-08-30 10:34:27'),(12,'Jane','Johnson','jane.johnson@example.com','2345678901','Los Angeles','1988-11-22',2,'2019-08-20',NULL,'2023-08-30 10:34:27','2023-08-31 09:42:40'),(13,'Michael','Williams','michael.williams@example.com','3456789012','New Jersey','1995-02-05',1,'2021-03-05',1,'2023-08-30 10:34:27','2023-08-30 17:30:52'),(14,'Emily','Brown','emily.brown@example.com','4567890123','Houston','1992-09-10',4,'2022-02-18',3,'2023-08-30 10:34:27','2023-08-30 10:34:27'),(15,'William','Jones','william.jones@example.com','5678901234','Miami','1991-07-30',5,'2020-11-30',5,'2023-08-30 10:34:27','2023-08-30 10:34:27'),(17,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1997-02-01',2,'2023-08-30',1,'2023-08-30 12:57:57','2023-08-30 12:57:57'),(18,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 12:59:49','2023-08-30 12:59:49'),(19,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:00:19','2023-08-30 13:00:19'),(20,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:00:39','2023-08-30 13:00:39'),(21,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:36:29','2023-08-30 13:36:29'),(22,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:37:13','2023-08-30 13:37:13'),(23,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:38:27','2023-08-30 13:38:27'),(24,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:38:44','2023-08-30 13:38:44'),(25,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:39:02','2023-08-30 13:39:02'),(26,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:39:42','2023-08-30 13:39:42'),(27,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:40:23','2023-08-30 13:40:23'),(28,'Jossya','Harry','jossya.h@corp-mail.com','+355545455569','Oxford','1969-02-01',2,'2023-08-30',1,'2023-08-30 13:40:44','2023-08-30 13:40:44'),(29,'Harry','Marry','h.m@corp-mail.com','+558575745455569','Berlin','1979-02-01',4,'2023-08-30',5,'2023-08-30 17:39:27','2023-08-30 17:39:27');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(45) NOT NULL,
  `salary_limit` int NOT NULL DEFAULT '4000',
  `head` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `headID_idx` (`head`),
  CONSTRAINT `headID` FOREIGN KEY (`head`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Manager',6000,NULL,'2023-08-30 10:29:37','2023-08-30 10:29:37'),(2,'Developer',5000,NULL,'2023-08-30 10:29:37','2023-08-30 13:40:44'),(3,'Designer',4500,NULL,'2023-08-30 10:29:37','2023-08-30 10:29:37'),(4,'QA Engineer',4800,NULL,'2023-08-30 10:29:37','2023-08-30 17:39:27'),(5,'Analyst',5500,NULL,'2023-08-30 10:29:37','2023-08-30 12:54:13');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions_temp`
--

DROP TABLE IF EXISTS `positions_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions_temp` (
  `new_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `position_name` varchar(45) CHARACTER SET utf8mb3 NOT NULL,
  `salary_limit` int NOT NULL DEFAULT '4000',
  `head` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`new_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions_temp`
--

LOCK TABLES `positions_temp` WRITE;
/*!40000 ALTER TABLE `positions_temp` DISABLE KEYS */;
INSERT INTO `positions_temp` VALUES (1,1,'Manager',6000,NULL,'2023-08-30 10:29:37','2023-08-30 10:29:37'),(2,2,'Developer',5000,NULL,'2023-08-30 10:29:37','2023-08-30 13:40:44'),(3,3,'Designer',4500,NULL,'2023-08-30 10:29:37','2023-08-30 10:29:37'),(4,4,'QA Engineer',4800,NULL,'2023-08-30 10:29:37','2023-08-30 17:39:27'),(5,5,'Analyst',5500,NULL,'2023-08-30 10:29:37','2023-08-30 12:54:13');
/*!40000 ALTER TABLE `positions_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `contact_person` varchar(45) NOT NULL,
  `contact_email` varchar(45) NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Project A','John Doe','john.doe@example.com',1,'2023-08-30 10:26:36','2023-08-30 10:26:36'),(2,'Project B','Jane Smith','jane.smith@example.com',0,'2023-08-30 10:26:36','2023-08-31 09:42:40'),(3,'Project C','Michael Johnson','michael.johnson@example.com',1,'2023-08-30 10:26:36','2023-08-30 10:26:36'),(4,'Project D','Emily Brown','emily.brown@example.com',1,'2023-08-30 10:26:36','2023-08-30 10:26:36'),(5,'QW 2020','William Jones','william.jones@example.com',1,'2023-08-30 10:26:36','2023-08-31 09:33:31'),(6,'Voltage','Tanisha Duncan','t.dunkan@voltage.com',1,'2023-08-31 09:24:20','2023-08-31 09:24:20'),(7,'Voltage','Tanisha Duncan','t.dunkan@voltage.com',1,'2023-08-31 09:24:59','2023-08-31 09:24:59'),(8,'Voltage','Tanisha Duncan','t.dunkan@voltage.com',1,'2023-08-31 09:25:56','2023-08-31 09:25:56'),(9,'Voltage','Tanisha Duncan','t.dunkan@voltage.com',0,'2023-08-31 09:26:21','2023-08-31 09:37:16'),(10,'Voltage','Tanisha Duncan','t.dunkan@voltage.com',1,'2023-08-31 09:26:54','2023-08-31 09:26:54');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-31 13:48:24
