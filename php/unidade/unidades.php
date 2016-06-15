<?php
	require('../db/db.php');
	session_start();
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$sql = "SELECT * FROM unidades LIMIT $start, $limit";

	$result = array();
	if($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM unidades");
	$linha = $sqlTotal->fetch_assoc();
	$total = $linha['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result 
	));
	//Fecha a conexão
	$mysqli->close();
?>