<?php
	require("../db/db.php");
	session_start();
	if($_SESSION['authenticated'] = "yes") {
		$username = $_SESSION['username'];
		$id = $_SESSION['user_id'];
		$name = $_SESSION['name'];
		$matricula = $_SESSION['registration'];
	}

	echo json_encode(array (
		"username" => $username,
		"nome" => $name,
		"matricula" => $matricula,
		"user_id" => $id
	));


?>