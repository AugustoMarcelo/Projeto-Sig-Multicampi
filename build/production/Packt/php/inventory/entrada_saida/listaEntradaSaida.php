<?php
	
	require("../../db/db.php");
	session_start();

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	$sql = "SELECT * FROM estoque LIMIT $start, $limit";
	$sqlTotal = "SELECT COUNT(*) AS num FROM estoque";

	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query($sqlTotal);
	$row = $sqlTotal->fetch_assoc();
	$total = $row['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));	
	//FECHANDO A CONEXÃO
	$mysqli->close();
?>