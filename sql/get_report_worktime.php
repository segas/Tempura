<?php
//include('./db_connection.php'); //load config

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$mysql_hostname = "192.168.1.17";
$mysql_user = "tempura";
$mysql_password = "KuoRk%3Zjn$";
$mysql_database = "tempura";

$con = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database) or die("Login error! Code: 001"); // Connect to database server(localhost) with username and password.


$postdata = file_get_contents("php://input");
$data = json_decode($postdata);
$id_user = $data->id_user;
$month = $data->month;
$year = $data->year;


$result = mysqli_query($con, "SELECT id_worktime, date, timeamfrom, timeamto, timepmfrom, timepmto, pause, restday, worktime, fs_user FROM worktime_view WHERE fs_user = '".$id_user."' AND MONTH(date) = '".$month."' AND YEAR(date) = '".$year."'");
$counter = 0;

$json = [];
while($row = mysqli_fetch_assoc($result)){
  $json[] = $row;
}

//echo json_encode($json);
echo ('{"worktime":'.json_encode($json).', "error": {"code": "000","message": "Flüge konnten erfolgreich in der Datenbank gefunden werden."}}');
?>

