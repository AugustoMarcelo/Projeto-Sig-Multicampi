<?php
	require ('../db/db.php');

	//Recuperando os valores enviados pelo formulário
	$id = $_POST['id'];
	$tombo = $_POST['tombo'];
	$denominacao = $_POST['denominacao'];
	$especificacoes = $_POST['especificacoes'];
	$codigo_unidade = $_POST['codigo_unidade'];
	$tipoMaterial = $_POST['tipoMaterial'];
	$localizacao = $_POST['localizacao'];
	$preco = $_POST['preco'];
	$situacao = $_POST['situacao'];
	if(isset($_POST['emprestavel'])) {				
		$emprestavel = 1;	
	} else {
		$emprestavel = 0;
	}
	$diretorio_imagem = '../../resources/patrimonioImages';
	$novoCadastro = false;

	//Se o ID for nulo, um novo cadastro está sendo realizado
	if($id == "") {
		$novoCadastro = true;
		$id = 0;
	}

	if(isset($_FILES)) {
		$tmpName = $_FILES['imagem']['tmp_name'];
		$nome_da_imagem = $tombo . "_" . $_FILES['imagem']['name'];
		if($novoCadastro == true) {
			move_uploaded_file($tmpName, "$diretorio_imagem/$nome_da_imagem");
		}
	}

	/* Se o ID for igual à zero, um no objeto será criado.
	 * Se for diferente de zero, um objeto existente será atualizado.
	 * Estrutura de inserção ou update do patrimônio no banco de dados
	 */ 
	if($id == 0) {
		$insertQuery = "INSERT INTO patrimonios (tombo, denominacao, especificacoes, codigo_unidade, tipoMaterial, localizacao, preco, situacao, emprestavel) VALUES ('$tombo', '$denominacao', '$especificacoes', '$codigo_unidade', '$tipoMaterial', '$localizacao', '$preco', '$situacao', '$emprestavel')";
		if($_FILES['imagem']['size'] != 0) {
			$insertQuery = "INSERT INTO patrimonios (tombo, denominacao, especificacoes, codigo_unidade, tipoMaterial, preco, situacao, emprestavel, imagem) VALUES ('$tombo', '$denominacao', '$especificacoes', '$codigo_unidade', '$tipoMaterial', '$localizacao', '$preco', '$situacao', '$emprestavel', '$nome_da_imagem')";
		}
		if($resultdb = $mysqli->query($insertQuery)) {
			$id = $mysqli->insert_id;
		}
	} else {
		$updateQuery = "UPDATE patrimonios SET tombo = '$tombo', denominacao = '$denominacao', especificacoes = '$especificacoes', codigo_unidade = '$codigo_unidade', tipoMaterial = '$tipoMaterial', localizacao = '$localizacao', preco = '$preco', situacao = '$situacao', emprestavel = '$emprestavel' WHERE id = '$id'";
		if($tmpName != null) {
			$searchImage = "SELECT imagem FROM patrimonios WHERE id = '$id'";
			$result = $mysqli->query($searchImage);
			$resultSearch = $result->fectch_assoc();
			$resultImage = $resultImage['imagem'];
			$bool = file_exists("$diretorio_imagem/$resultImage");
			if($boll && $resultImage != null) {
				/* Exclusão da imagem a ser atualizada 
				 * Com isso, a imagem, agora inutilizada, não ocupará mais espaço
				 */
				$result = unlink("$diretorio_imagem/$resultImage"); 
			}
			move_uploaded_file($tmpName, "$diretorio_imagem/$nome_da_imagem");
			$updateQuery = "UPDATE patrimonios SET tombo = '$tombo', denominacao = '$denominacao', especificacoes = '$especificacoes', codigo_unidade = '$codigo_unidade', tipoMaterial = '$tipoMaterial', localizacao = '$localizacao', preco = '$preco', situacao = '$situacao', emprestavel = '$emprestavel', imagem = '$nome_da_imagem' WHERE id = '$id'";
		}
		$resultdb = $mysqli->query($updateQuery);
	}
	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error,
		"id" => $id,
		"cadastro" => $novoCadastro,
		"image" => $nome_da_imagem
	));
	//Fecha a conexão
	$mysqli->close();
?>