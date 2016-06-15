<?php
	require('../../db/db.php');

	$sql = "DELETE FROM userlog";
	$resultdb = $mysqli->query($sql);

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0
	));

?>