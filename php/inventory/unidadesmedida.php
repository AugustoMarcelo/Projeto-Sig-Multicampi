<?php
	
	require("../db/db.php");
	session_start();
	$sql = "SELECT * FROM unidadesMedida";
	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"data" => $result
	));	
	/* close connection */
	$mysqli->close();
?>