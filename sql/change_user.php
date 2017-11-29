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
$active = mysqli_real_escape_string($con, $data->active);


$sql = "UPDATE user SET username='".$username."', password='".$password."', lastname='".$lastname."', firstname='".$firstname."', function='".$function."', target_hours='".$target_hours."', admin='".$admin."', holiday_days='".$holiday_days."', hours_per_day='".$hours_per_day."', hours_per_month='".$hours_per_month."', active='".$active."' WHERE id_user='".$id_user."';";

if (mysqli_query($con, $sql)) {
    echo '{"error": "Record changed successfully"}';
} else {
    echo '{"error": "Record not changed"}';
}

mysqli_close($con);
?>

