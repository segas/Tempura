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
$type = mysqli_real_escape_string($con, $data->type);
$datefrom = mysqli_real_escape_string($con, $data->datefrom);
$dateto = mysqli_real_escape_string($con, $data->dateto);
$halfaday = mysqli_real_escape_string($con, $data->halfaday);



$sql = "INSERT INTO nonbuisnesstime (type, datefrom, dateto, halfaday, fs_user) VALUES ('".$type."', '".$datefrom."', '".$dateto."', '".$halfaday."', '".$id_user."');";

if (mysqli_query($con, $sql)) {
    echo '{"error": "New record created successfully"}';
} else {
    echo '{"error": "New record not created"}';
}

mysqli_close($con);
?>

