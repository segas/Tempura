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
$id = mysqli_real_escape_string($con, $data->id);




$sql = "DELETE FROM worktime WHERE id_worktime='".$id."';";

if (mysqli_query($con, $sql)) {
    echo '{"error": "Record successfully deleted"}';
} else {
    echo '{"error": "Record hasnt been deleted"}';
}

mysqli_close($con);
?>

