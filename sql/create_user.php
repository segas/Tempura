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
$username = mysqli_real_escape_string($con, $data->username);
$password = mysqli_real_escape_string($con, $data->password);
$lastname = mysqli_real_escape_string($con, $data->lastname);
$firstname = mysqli_real_escape_string($con, $data->firstname);
$function = mysqli_real_escape_string($con, $data->function);
$target_hours = mysqli_real_escape_string($con, $data->target_hours);
$admin = mysqli_real_escape_string($con, $data->admin);
$holiday_days = mysqli_real_escape_string($con, $data->holiday_days);
$hours_per_day = mysqli_real_escape_string($con, $data->hours_per_day);
$hours_per_month = mysqli_real_escape_string($con, $data->hours_per_month);
/*
$username = 'pga';
$password = 'pga';
$lastname = 'Gassner';
$firstname = 'Patrick';
$function = 'Testuser';
$target_hours = '0';
$admin = '0';
$holiday_days = '0';
$hours_per_day = '0';
$hours_per_month = '0';
*/


$sql = "INSERT INTO user (username, password, lastname, firstname, function, target_hours, admin, holiday_days, hours_per_day, hours_per_month) VALUES ('".$username."', '".$password."', '".$lastname."', '".$firstname."', '".$function."', '".$target_hours."', '".$admin."', '".$holiday_days."', '".$hours_per_day."', '".$hours_per_month."');";

if (mysqli_query($con, $sql)) {
    echo '{"error": "New record created successfully"}';
} else {
    echo '{"error": "New record not created"}';
}

mysqli_close($con);
?>

