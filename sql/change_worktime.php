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
$id_user = mysqli_real_escape_string($con, $data->id_user);
$id_worktime = mysqli_real_escape_string($con, $data->id_worktime);
$date = mysqli_real_escape_string($con, $data->date);
$timeamfrom = mysqli_real_escape_string($con, $data->timeamfrom);
$timeamto = mysqli_real_escape_string($con, $data->timeamto);
$timepmfrom = mysqli_real_escape_string($con, $data->timepmfrom);
$timepmto = mysqli_real_escape_string($con, $data->timepmto);
$pause = mysqli_real_escape_string($con, $data->pause);
$restday = mysqli_real_escape_string($con, $data->restday);


$sql = "UPDATE worktime SET date='".$date."', timeamfrom='".$timeamfrom."', timeamto='".$timeamto."', timepmfrom='".$timepmfrom."', timepmto='".$timepmto."', pause='".$pause."', restday='".$restday."' WHERE fs_user='".$id_user."' AND id_worktime='".$id_worktime."';";

if (mysqli_query($con, $sql)) {
    echo '{"error": "Record changed successfully"}';
} else {
    echo '{"error": "Record change failed"}';
}

mysqli_close($con);
?>

