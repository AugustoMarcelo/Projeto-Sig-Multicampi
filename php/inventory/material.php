<?php
	
	require("../db/db.php");
	session_start();
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$mysqli->query('SET CHARACTER SET utf8');
	$sql = "SELECT * FROM materiais LIMIT $start, $limit";

	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM materiais");
	$row = $sqlTotal->fetch_assoc();
	$total = $row['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));	
	/* close connection */
	$mysqli->close();
?>