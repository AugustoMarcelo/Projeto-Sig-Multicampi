<?php
	
	require("../db/db.php");
	session_start();
	$groupId = null;//INICIANDO A VARIÁVEL COMO NULA
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	if(isset($_GET['group'])) { //SE A VARIÁVEL 'group' TIVER ALGUM VALOR, OU SEJA, FOR TRUE, RECEBA O VALOR
		$groupId = $_GET['group'];
	}
	$sql = "SELECT * FROM User GROUP BY name ASC LIMIT $start, $limit";
	$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM User");
	if ($groupId != null) {
		$sql = "SELECT * FROM User WHERE group_id = $groupId LIMIT $start, $limit";
		$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM User WHERE group_id = $groupId");
	}

	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}

	$linha = $sqlTotal->fetch_assoc();
	$total = $linha['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"data" => $result,
		"total" => $total,
		"grupo" => $groupId
	));	
	/* close connection */
	$mysqli->close();
?>