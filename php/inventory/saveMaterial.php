<?php
	require("../db/db.php");
	session_start();
	$id = $_POST['id']; 
	$name = $_POST['name'];

	if ($id == ""){		
		$id = 0;
	}
	$mysqli->query('SET CHARACTER SET utf8');
	if ($id ==  0) { //create
		$insertQuery = "INSERT INTO materiais (name) VALUES ('$name')";
		
		if ($resultdb = $mysqli->query($insertQuery)) {
			$id = $mysqli->insert_id;
		}	
	} else {
		$updateQuery = "UPDATE materiais SET name = '$name' WHERE id='$id'";
		$resultdb = $mysqli->query($updateQuery);	
	}
	header('Content-type: text/html');
	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error
	));
	/* close connection */
	$mysqli->close();
?>