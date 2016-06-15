<?php 
	$server = "127.0.0.1";
	$user = "root";
	$pass = "";
	$dbName = "sakila";
	$mysqli = new mysqli($server, $user, $pass, $dbName);
	/* check connection */
	if ($mysqli->connect_errno) {
	    printf("Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}
	$mysqli->query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $mysqli->connect_errno);
?>