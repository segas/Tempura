<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$mysql_hostname = "192.168.1.17";
$mysql_user = "tempura";
$mysql_password = "KuoRk%3Zjn$";
$mysql_database = "tempura";

$con = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database) or die("Login error! Code: 001"); // Connect to database server(localhost) with username and password.


$result = mysqli_query($con, "SELECT DISTINCT username FROM user ORDER BY username ASC");

$json = [];
while($row = mysqli_fetch_assoc($result)){
  $json[] = $row['username'];
}

echo ('{"users":'.json_encode($json).', "error": {"code": "000","message": "User konnten in der Datenbank gefunden werden."}}');
?>
