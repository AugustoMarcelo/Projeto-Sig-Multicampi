<?php
	
	require("../db/db.php");
	session_start();
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$sql = "SELECT * FROM Product WHERE quantidade <= quantidadeMin LIMIT $start, $limit";
	/*if ($groupId) {
		$sql .= " WHERE group_id = '$groupId'";
	}*/
	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}

	$queryTotal = $mysqli->query('SELECT count(*) AS num FROM Product WHERE quantidade <= quantidadeMin');
	$row = $queryTotal->fetch_assoc();
	$total = $row['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));	
	/* close connection */
	$mysqli->close();
?>