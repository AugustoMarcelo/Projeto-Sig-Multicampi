<?php
	require('../db/db.php');
	session_start();
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$sql = "SELECT * FROM localizacoes GROUP BY numSala ASC LIMIT $start, $limit";

	$result = array();
	if($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM localizacoes LIMIT $start, $limit");
	$linha = $sqlTotal->fetch_assoc();
	$total = $linha['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));

	$mysqli->close();
?>