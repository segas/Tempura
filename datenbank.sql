CREATE DATABASE tempura;

USE tempura;

CREATE TABLE user (
	id_user int UNSIGNED NOT NULL,
	username varchar(25) NOT NULL,
	password varchar(25) NOT NULL,
	lastname varchar(50) NOT NULL,
	firstname varchar(50) NOT NULL,
	function varchar(50) NOT NULL,
	target_hours int UNSIGNED NOT NULL,
	admin ENUM('0','1') default '0',
	holiday_days int UNSIGNED NOT NULL,
	hours_per_day int UNSIGNED NOT NULL,
	hours_per_month int UNSIGNED NOT NULL,
	active ENUM('0','1') default '1' NOT NULL,
	PRIMARY KEY(id_user)
);

CREATE TABLE worktime (
	id_worktime int UNSIGNED NOT NULL,
	date date NOT NULL,
	timeamfrom time NOT NULL,
	timeamto time NOT NULL,
	timepmfrom time NOT NULL,
	timepmto time NOT NULL,
	pause ENUM('0','15','30','45','60') NOT NULL default '0',
	restday ENUM('0','50','100') NOT NULL default '0',
	fs_user int UNSIGNED NOT NULL,
	PRIMARY KEY(id_worktime),
	FOREIGN KEY (fs_user) REFERENCES user(id_user) ON DELETE CASCADE
);

CREATE TABLE nonbuisnesstime (
	id_nonbuisnesstime int UNSIGNED NOT NULL,
	type ENUM('Ferien','Unfall','Krankheit','Militaer','Schwangerschaft'),
	datefrom date NOT NULL,
	dateto date NOT NULL,
	halfaday enum('0','1') default '0',
	fs_user int UNSIGNED NOT NULL,
	PRIMARY KEY(id_nonbuisnesstime),
	FOREIGN KEY (fs_user) REFERENCES user(id_user) ON DELETE CASCADE
);
