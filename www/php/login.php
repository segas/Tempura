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
$loginData = json_decode($postdata);
$username = $loginData->username;
$password = $loginData->password;

$userData = array('correct' => '',
                'id_user' => '',
				'firstname' => '',
				'lastname' => '',
				'username' => '',
				'admin' => '');


if(!empty($username) && !empty($password)){



	$username = mysqli_real_escape_string($con, $username);
	$password = mysqli_real_escape_string($con, $password);


	$query = "SELECT id_user, username, firstname, lastname, admin FROM user WHERE username='".$username."' AND password='".$password."' AND active='1' LIMIT 1";
	$results = mysqli_query($con, $query) or die("Login error! Code: 003");
	$match  = mysqli_num_rows($results);

	$res = mysqli_fetch_assoc($results);
    	echo $res[''];

	if($match > 0 ){
			// login success
            		$userData['correct'] = 'True';
			$userData['id_user'] = $res['id_user'];
			$userData['firstname'] = $res['firstname'];
			$userData['lastname'] = $res['lastname'];
			$userData['username'] = $res['username'];
      $userData['admin'] = $res['admin'];
			echo ('{"userData":'.json_encode($userData).', "error": {"code": "000","message": "The email or password you entered is correct."}}');
	}else{
		// login failed
        	$userData['correct'] = 'False';
		echo ('{"userData":'.json_encode($userData).', "error": {"code": "002","message": "The email or password you entered is incorrect."}}');
	}
} else {
	// something failed with submitting data, should never get here!
	echo('{"userData":'.json_encode($userData).', "error": {"code":"005", "message": "Login error! Code: 005"}}');
}
?>
