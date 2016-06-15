<?php
	require("../db/db.php");
	
	$id = $_POST['id']; 
	$codigo = $_POST['codigo'];
	$name = $_POST['nome'];
	$quantidade = $_POST['quantidade'];
	$quantidadeMin = $_POST['quantidadeMin'];
	$sigla = $_POST['Sigla_id'];
	$descricao = $_POST['descricao'];
	$dataCadastro = $_POST['dataCadastro'];
	$uploads_dir = '../../resources/productImages';
	$newCadastro = false;
	if ($id == ""){
		$newCadastro = true;
		$id = 0;
	}
	if(isset($_FILES)){
		$tmpName = $_FILES['picture']['tmp_name'];
		$fileName = $codigo . "_" . $_FILES['picture']['name'];
		if($newCadastro == true) {
			move_uploaded_file($tmpName, "$uploads_dir/$fileName");
		}
	}	
	if ($id ==  0) { //create
		$insertQuery = "INSERT INTO product (nome, codigo, quantidade, quantidadeMin, Sigla_id, descricao, ";//) ";
		if ($_FILES['picture']['size'] != 0) {
			$insertQuery .= "picture, ";
		}
		$insertQuery .= "dataCadastro)";
		$insertQuery .= "VALUES ('$name', '$codigo', '$quantidade', '$quantidadeMin', '$sigla', '$descricao', ";//'$dataCadastro')";
		if ($_FILES['picture']['size'] != 0) {
			$insertQuery .= "'$fileName', ";
		}
		$insertQuery .= "'$dataCadastro')";
		if ($resultdb = $mysqli->query($insertQuery)) {
			$id = $mysqli->insert_id;
		}	
	} else {
		$updateQuery = "UPDATE product SET ";
		$updateQuery .= "nome = '$name', ";
		$updateQuery .= "codigo = '$codigo', ";
		$updateQuery .= "quantidade = '$quantidade', ";
		$updateQuery .= "quantidadeMin = '$quantidadeMin', ";
		$updateQuery .= "Sigla_id = '$sigla', ";
		$updateQuery .= "descricao = '$descricao', ";
		if ($tmpName != null) { // only update it if file upload
			$searchPicture = "SELECT picture FROM Product WHERE id='$id'"; 
			$result = $mysqli->query($searchPicture);
			$resultSearch = $result->fetch_assoc();
			$resultPicture = $resultSearch['picture'];
			$bool = file_exists("$uploads_dir/$resultPicture");
			if($bool && $resultPicture != null) {
				$result = unlink("$uploads_dir/$resultPicture"); //Exclusão da imagem a ser atualizada							
			}
			move_uploaded_file($tmpName, "$uploads_dir/$fileName");
			$updateQuery .= "picture = '$fileName', ";
		}
		$updateQuery .= "dataCadastro = '$dataCadastro' ";
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