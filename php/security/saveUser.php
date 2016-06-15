<?php
	require("../db/db.php");
	session_start();
	$id = $_POST['id']; 
	$userName = $_POST['userName'];
	$name = $_POST['name'];
	$registration = $_POST['registration'];
	$group = $_POST['Group_id'];
	$level = $_POST['level'];
	$status = $_POST['status'];
	$password = $_POST['password'];
	$password = md5($password);
	//O SEGUINTE SELECT SERVIRÁ PARA COMPARAR AS SENHAS DO USUÁRIO.
	//SE ELE NÃO A MODIFICAR, O PHP FARÁ O HASH DA SENHA QUE ESTÁ LÁ (QUE JÁ É UM HASH)
	//NESSE CASO, EU COMPARO O RE-HASH DO FORM COM O RE-HASH DO BD
	$searchPass = "SELECT password FROM User WHERE id='$id'";
	$resultPass = $mysqli->query($searchPass);
	$resultSearch = $resultPass->fetch_assoc();
	$resultPass = $resultSearch['password'];
	$resultPass = md5($resultPass);
	$uploads_dir = '../../resources/profileImages';
	$newCadastro = false;
	if ($id == ""){
		$newCadastro = true;
		$id = 0;
	}
	if(isset($_FILES)){
		$tmpName = $_FILES['picture']['tmp_name'];
		$fileName = $userName. "_" .$_FILES['picture']['name'];
		if($newCadastro == true) {
			move_uploaded_file($tmpName, "$uploads_dir/$fileName");
		}
	}	
	if ($id ==  0) { //create
		$insertQuery = "INSERT INTO user (name, userName, password, registration, level, status, ";//Group_id) ";
		if ($_FILES['picture']['size'] != 0) {
			$insertQuery .= "picture, ";
		}
		$insertQuery .= "Group_id)";
		$insertQuery .= "VALUES ('$name', '$userName', '$password', '$registration', '$level', '$status', ";//'$group')";
		if ($_FILES['picture']['size'] != 0) {
			$insertQuery .= "'$fileName', ";
		}
		$insertQuery .= "'$group')";
		if ($resultdb = $mysqli->query($insertQuery)) {
			$id = $mysqli->insert_id;
		}	
	} else {
		$updateQuery = "UPDATE user SET ";
		$updateQuery .= "name = '$name', ";
		$updateQuery .= "userName = '$userName', ";
		$updateQuery .= "registration = '$registration', ";
		$updateQuery .= "level = '$level', ";
		$updateQuery .= "status = '$status', ";
		if($password != $resultPass) { //COMPARAÇÃO ENTRE AS SENHAS DO FORM E DO BD COM RE-HASH 
			$updateQuery .= "password = '$password', "; 
		}
		if ($tmpName != null) { // only update it if file upload
			$searchPicture = "SELECT picture FROM User WHERE id='$id'"; 
			$result = $mysqli->query($searchPicture);
			$resultSearch = $result->fetch_assoc();
			$resultPicture = $resultSearch['picture'];
			$bool = file_exists("$uploads_dir/$resultPicture");
			if($bool && $resultPicture != null){
				$result = unlink("$uploads_dir/$resultPicture"); //Exclusão da imagem a ser atualizada
			}
			move_uploaded_file($tmpName, "$uploads_dir/$fileName");
			$updateQuery .= "picture = '$fileName', ";
		}
		$updateQuery .= "Group_id = '$group' ";
		$updateQuery .= " WHERE id='$id'";
		$resultdb = $mysqli->query($updateQuery);	
	}
	header('Content-type: text/html');
	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error,
		"id" => $id,
		"cadastro" => $newCadastro,
		"image" => $fileName		
	));
	/* close connection */
	$mysqli->close();
?>