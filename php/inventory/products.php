<?php
	
	require("../db/db.php");
	require("Model.php");
	session_start();

	$model = new Model();

	$start = $_REQUEST['start'];	
	//$limit = $_REQUEST['limit'];
	
	if(isset($_REQUEST['limit'])) {
		$limit = $_REQUEST['limit'];
		$optionsQuery = array(
			'fields' => '*',
			'tableName' => 'product',
			'start' => $start,
			'limit' => $limit,
			'order' => 'nome ASC'
		);

		$optionsCount = array(
			'tableName' => 'product'
		);
		
		/* QUANDO ESCREVI ESTE CÓDIGO, NEM DEUS COMPREENDEU, IMAGINE EU OU VOCÊ QUE ESTÁ LENDO AGORA...
		 *
		 * Se houver alguma requisição do tipo 'filtrar_material', o filtro será feito a partir de todos os produtos que não    * tenham tipoMaterial nulo.
		 * A variável $filtroFilter servirá para bloquear o outro tipo de filtro, que é realizado pelo searchfield, mas somente * quando o 'filtrar_material' for requisitado e que seu valor seja diferente de "Todos" e um valor em branco. 

		 * Caso o 'filtrar_material' não venha em branco, o filtro retornará todos os produtos que tenham o tipoMaterial igual * ao valor recuperado de $_REQUEST['operacao'].
		 * Além disso, a variável $filtroFilter receberá false para que a query seja feita somente pelo combo
		 * Se houver algum valor no searchfield, este entrará na query como mais uma condição.
		*/	
		 
		if(isset($_REQUEST['action']) AND $_REQUEST['action'] == 'filtrar_material') {
			$filter = "tipoMaterial != ''" ;		
			$filtroFilter = true;
			if($_REQUEST['operacao'] != "Todos" && $_REQUEST['operacao'] != "") {
				$filter = "tipoMaterial = " . $_REQUEST['operacao'];	
				$filtroFilter = false;
				if($_REQUEST['searchValue'] != "") {					
					$valorSearch = $_REQUEST['searchValue'];
					$filter = "nome LIKE '%$valorSearch%' AND tipoMaterial = " . $_REQUEST['operacao']; 				
				}
			} elseif ($_REQUEST['operacao'] == "Todos" && $_REQUEST['searchValue'] != "") {
				$filter = "nome LIKE '%" . $_REQUEST['searchValue'] . "%' AND tipoMaterial != ''";
				$filtroFilter = false;
			}
			
			$optionsQuery['conditions'] = $filter;
			$optionsCount['conditions'] = $filter;

		}
		
		if(isset($_REQUEST['filter'])) {		
			if(!isset($filtroFilter) || (isset($filtroFilter) && $filtroFilter == true)) {			
				$filter = "nome LIKE '%" . $_REQUEST['filter'] . "%'";
				if(isset($_REQUEST['combo-material'])) {
					if($_REQUEST['combo-material'] != "" && $_REQUEST['combo-material'] != "Todos") {
						$valorCombo = $_REQUEST['combo-material'];
						$filter = "nome LIKE '%" . $_REQUEST['filter'] . "%' AND tipoMaterial = '$valorCombo'";		
					}
				}
				$optionsQuery['conditions'] = $filter;
				$optionsCount['conditions'] = $filter;
			} 
		}		

		$data = $model->find($optionsQuery);

		$total = $model->findCount($optionsCount);	

		echo json_encode(array(
			"success" => true,
			"total" => (int)$total['total'],
			"data" => $data,
			"query" => $optionsQuery

		));

	} else {
		$sql = "SELECT * FROM product";		
		$result = array();
		if($resultdb = $mysqli->query($sql)) {
			while($profile = $resultdb->fetch_assoc()) {
				$result[] = $profile;
			}
			$resultdb->close();
		}

		$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM product");
		$linha = $sqlTotal->fetch_assoc();
		$total = $linha['num'];	

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,			
			"data" => $result,
			"total" => $total
		));
		//Fecha a conexão
		$mysqli->close();
	}

?>

