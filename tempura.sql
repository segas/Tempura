-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 29. Nov 2017 um 12:32
-- Server-Version: 5.7.18-0ubuntu0.16.10.1
-- PHP-Version: 7.0.15-0ubuntu0.16.10.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `tempura`
--

-- --------------------------------------------------------

CREATE TABLE `user` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `function` varchar(50) NOT NULL,
  `target_hours` int(10) UNSIGNED NOT NULL,
  `admin` enum('0','1') DEFAULT '0',
  `holiday_days` int(10) UNSIGNED NOT NULL,
  `hours_per_day` int(10) UNSIGNED NOT NULL,
  `hours_per_month` int(10) UNSIGNED NOT NULL,
  `active` enum('0','1') DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `nonbuisnesstime` (
  `id_nonbuisnesstime` int(10) UNSIGNED NOT NULL,
  `type` enum('Ferien','Unfall','Krankheit','Militaer','Schwangerschaft') DEFAULT NULL,
  `datefrom` date NOT NULL,
  `dateto` date NOT NULL,
  `halfaday` enum('0','1') DEFAULT '0',
  `fs_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `worktime` (
  `id_worktime` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `timeamfrom` time NOT NULL,
  `timeamto` time NOT NULL,
  `timepmfrom` time NOT NULL,
  `timepmto` time NOT NULL,
  `pause` enum('0','15','30','45','60') NOT NULL DEFAULT '0',
  `restday` enum('0','50','100') NOT NULL DEFAULT '0',
  `fs_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

ALTER TABLE `worktime`
  ADD PRIMARY KEY (`id_worktime`),
  ADD KEY `fs_user` (`fs_user`);

ALTER TABLE `nonbuisnesstime`
  ADD PRIMARY KEY (`id_nonbuisnesstime`),
  ADD KEY `fs_user` (`fs_user`);


ALTER TABLE `user`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

ALTER TABLE `worktime`
  MODIFY `id_worktime` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

ALTER TABLE `nonbuisnesstime`
  MODIFY `id_nonbuisnesstime` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `nonbuisnesstime`
  ADD CONSTRAINT `nonbuisnesstime_ibfk_1` FOREIGN KEY (`fs_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

ALTER TABLE `worktime`
  ADD CONSTRAINT `worktime_ibfk_1` FOREIGN KEY (`fs_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `lastname`, `firstname`, `function`, `target_hours`, `admin`, `holiday_days`, `hours_per_day`, `hours_per_month`, `active`) VALUES
(0, 'sgas', 'sgas', 'Gassner', 'Stefan', 'Testuser', 42, '1', 25, 8, 8, '1'),
(1, 'sdel', 'sdel', 'Dellsperger', 'Severin', 'Testuser', 32, '1', 15, 15, 15, '1'),
(2, 'avin', 'avin', 'Vincenz', 'Andri', 'Testuser', 20, '1', 0, 0, 0, '1'),
(3, 'nonadmin', 'nonadmin', 'Non', 'Admin', 'Testuser', 0, '0', 0, 0, 0, '1');

-- --------------------------------------------------------
--
-- Daten für Tabelle `worktime`
--

INSERT INTO `worktime` (`id_worktime`, `date`, `timeamfrom`, `timeamto`, `timepmfrom`, `timepmto`, `pause`, `restday`, `fs_user`) VALUES
(8, '2017-05-10', '07:00:00', '08:00:00', '14:00:00', '17:00:00', '0', '0', 0),
(9, '2017-05-17', '08:00:00', '11:00:00', '12:00:00', '17:00:00', '15', '0', 0),
(10, '2017-05-16', '08:00:00', '11:00:00', '12:00:00', '17:00:00', '15', '0', 0),
(11, '2017-05-15', '08:00:00', '11:00:00', '12:00:00', '17:00:00', '15', '0', 0),
(12, '2017-05-14', '08:00:00', '11:00:00', '12:00:00', '17:00:00', '15', '0', 0),
(13, '2017-05-10', '08:00:00', '11:00:00', '12:00:00', '17:00:00', '15', '0', 0),
(14, '2017-05-31', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '0', '0', 0),
(15, '2017-06-04', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '0', '0', 0),
(16, '2017-06-04', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '0', '0', 0),
(17, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(18, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(19, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(20, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(21, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(22, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(23, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(24, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(25, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(26, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(27, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(28, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(29, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(30, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(31, '2017-01-01', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '0', '0', 0),
(32, '2015-01-03', '02:00:00', '04:00:00', '06:00:00', '08:00:00', '45', '100', 0),
(33, '2016-01-04', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '60', '100', 0),
(34, '2017-01-02', '01:00:00', '02:00:00', '02:00:00', '03:00:00', '0', '0', 0),
(35, '2017-01-02', '02:00:00', '03:00:00', '06:00:00', '08:00:00', '0', '0', 0),
(36, '2017-09-28', '06:15:00', '11:45:00', '13:00:00', '17:00:00', '30', '0', 0),
(37, '2017-10-23', '15:49:00', '15:49:00', '15:49:00', '15:49:00', '0', '0', 0),
(38, '2017-10-23', '17:45:00', '18:45:00', '19:45:00', '20:45:00', '0', '0', 0);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `worktime_view`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `worktime_view` (
`id_worktime` int(10) unsigned
,`date` date
,`timeamfrom` time
,`timeamto` time
,`timepmfrom` time
,`timepmto` time
,`pause` enum('0','15','30','45','60')
,`restday` enum('0','50','100')
,`fs_user` int(10) unsigned
,`worktime` time
);

-- --------------------------------------------------------

--
-- Struktur des Views `worktime_view`
--
DROP TABLE IF EXISTS `worktime_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `worktime_view`  AS  select `worktime`.`id_worktime` AS `id_worktime`,`worktime`.`date` AS `date`,`worktime`.`timeamfrom` AS `timeamfrom`,`worktime`.`timeamto` AS `timeamto`,`worktime`.`timepmfrom` AS `timepmfrom`,`worktime`.`timepmto` AS `timepmto`,`worktime`.`pause` AS `pause`,`worktime`.`restday` AS `restday`,`worktime`.`fs_user` AS `fs_user`,timediff(timediff(`worktime`.`timepmto`,`worktime`.`timeamfrom`),timediff(`worktime`.`timepmfrom`,`worktime`.`timeamto`)) AS `worktime` from `worktime` ;

