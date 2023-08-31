# hr_helper_api

MySQL script with initial data:
[Uploading bsm0ltxeb8ee72-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bsm0ltxeb8ee72tiwrhq-mysql.services.clever-cloud.com:3306
-- Generation Time: Aug 31, 2023 at 01:54 PM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsm0ltxeb8ee72tiwrhq`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int NOT NULL,
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
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `phone`, `city`, `birthday`, `position`, `join_date`, `project`, `created_at`, `modified_at`) VALUES
(11, 'John', 'Smith', 'john.smith@example.com', '1234567890', 'New York', '1990-05-15', 1, '2020-01-10', 1, '2023-08-30 10:34:27', '2023-08-30 10:34:27'),
(12, 'Jane', 'Johnson', 'jane.johnson@example.com', '2345678901', 'Los Angeles', '1988-11-22', 2, '2019-08-20', NULL, '2023-08-30 10:34:27', '2023-08-31 09:42:40'),
(13, 'Michael', 'Williams', 'michael.williams@example.com', '3456789012', 'New Jersey', '1995-02-05', 1, '2021-03-05', 1, '2023-08-30 10:34:27', '2023-08-30 17:30:52'),
(14, 'Emily', 'Brown', 'emily.brown@example.com', '4567890123', 'Houston', '1992-09-10', 4, '2022-02-18', 3, '2023-08-30 10:34:27', '2023-08-30 10:34:27'),
(15, 'William', 'Jones', 'william.jones@example.com', '5678901234', 'Miami', '1991-07-30', 5, '2020-11-30', 5, '2023-08-30 10:34:27', '2023-08-30 10:34:27'),
(17, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1997-02-01', 2, '2023-08-30', 1, '2023-08-30 12:57:57', '2023-08-30 12:57:57'),
(18, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 12:59:49', '2023-08-30 12:59:49'),
(19, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:00:19', '2023-08-30 13:00:19'),
(20, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:00:39', '2023-08-30 13:00:39'),
(21, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:36:29', '2023-08-30 13:36:29'),
(22, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:37:13', '2023-08-30 13:37:13'),
(23, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:38:27', '2023-08-30 13:38:27'),
(24, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:38:44', '2023-08-30 13:38:44'),
(25, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:39:02', '2023-08-30 13:39:02'),
(26, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:39:42', '2023-08-30 13:39:42'),
(27, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:40:23', '2023-08-30 13:40:23'),
(28, 'Jossya', 'Harry', 'jossya.h@corp-mail.com', '+355545455569', 'Oxford', '1969-02-01', 2, '2023-08-30', 1, '2023-08-30 13:40:44', '2023-08-30 13:40:44'),
(29, 'Harry', 'Marry', 'h.m@corp-mail.com', '+558575745455569', 'Berlin', '1979-02-01', 4, '2023-08-30', 5, '2023-08-30 17:39:27', '2023-08-30 17:39:27');

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int NOT NULL,
  `position_name` varchar(45) NOT NULL,
  `salary_limit` int NOT NULL DEFAULT '4000',
  `head` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `position_name`, `salary_limit`, `head`, `created_at`, `modified_at`) VALUES
(1, 'Manager', 6000, NULL, '2023-08-30 10:29:37', '2023-08-30 10:29:37'),
(2, 'Developer', 5000, NULL, '2023-08-30 10:29:37', '2023-08-30 13:40:44'),
(3, 'Designer', 4500, NULL, '2023-08-30 10:29:37', '2023-08-30 10:29:37'),
(4, 'QA Engineer', 4800, NULL, '2023-08-30 10:29:37', '2023-08-30 17:39:27'),
(5, 'Analyst', 5500, NULL, '2023-08-30 10:29:37', '2023-08-30 12:54:13');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `contact_person` varchar(45) NOT NULL,
  `contact_email` varchar(45) NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `contact_person`, `contact_email`, `is_active`, `created_at`, `modified_at`) VALUES
(1, 'Project A', 'John Doe', 'john.doe@example.com', 1, '2023-08-30 10:26:36', '2023-08-30 10:26:36'),
(2, 'Project B', 'Jane Smith', 'jane.smith@example.com', 0, '2023-08-30 10:26:36', '2023-08-31 09:42:40'),
(3, 'Project C', 'Michael Johnson', 'michael.johnson@example.com', 1, '2023-08-30 10:26:36', '2023-08-30 10:26:36'),
(4, 'Project D', 'Emily Brown', 'emily.brown@example.com', 1, '2023-08-30 10:26:36', '2023-08-30 10:26:36'),
(5, 'QW 2020', 'William Jones', 'william.jones@example.com', 1, '2023-08-30 10:26:36', '2023-08-31 09:33:31'),
(6, 'Voltage', 'Tanisha Duncan', 't.dunkan@voltage.com', 1, '2023-08-31 09:24:20', '2023-08-31 09:24:20'),
(7, 'Voltage', 'Tanisha Duncan', 't.dunkan@voltage.com', 1, '2023-08-31 09:24:59', '2023-08-31 09:24:59'),
(8, 'Voltage', 'Tanisha Duncan', 't.dunkan@voltage.com', 1, '2023-08-31 09:25:56', '2023-08-31 09:25:56'),
(9, 'Voltage', 'Tanisha Duncan', 't.dunkan@voltage.com', 0, '2023-08-31 09:26:21', '2023-08-31 09:37:16'),
(10, 'Voltage', 'Tanisha Duncan', 't.dunkan@voltage.com', 1, '2023-08-31 09:26:54', '2023-08-31 09:26:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_idx` (`project`),
  ADD KEY `fk_employees_1_idx` (`position`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `headID_idx` (`head`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `positionID` FOREIGN KEY (`position`) REFERENCES `positions` (`id`),
  ADD CONSTRAINT `projectID` FOREIGN KEY (`project`) REFERENCES `projects` (`id`);

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `headID` FOREIGN KEY (`head`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
tiwrhq.sql…]()

MySQL DB Schema:
![Screenshot from 2023-08-31 17-40-27](https://github.com/dmytrosch/hr_helper_api/assets/61431597/7b4ccb75-0437-464a-953b-e65f88310ed6)

Emplyees table schema:
![Screenshot from 2023-08-31 17-39-46](https://github.com/dmytrosch/hr_helper_api/assets/61431597/f3c9d747-be22-421a-9b9c-5e75ec660d5e)

Positions table schema:
![Screenshot from 2023-08-31 17-40-09](https://github.com/dmytrosch/hr_helper_api/assets/61431597/5ab335d6-43f2-4d9e-818c-cb362fe0dec4)

Projects table schema:
![Screenshot from 2023-08-31 17-40-27](https://github.com/dmytrosch/hr_helper_api/assets/61431597/bec405c3-92bb-4139-acba-c922106a12d5)
