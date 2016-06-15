<?php
	require("../db/db.php");

	session_start();

	$groupId = null;
	if(isset($_REQUEST['group'])) {
		$groupId = $_REQUEST['group'];
	}

	$folder = array();

	$sql = "SELECT * FROM menu WHERE parent_id IS NULL";

	if($resultdb = $mysqli->query($sql)) {

		while($r = $resultdb->fetch_assoc()) {

			$id = $r['id'];
			$queryString = "SELECT Menu_id FROM permissions ";
			$queryString .= "WHERE Group_id = '$groupId' ";
			$queryString .= "and Menu_id = '$id'";

			if($checked = $mysqli->query($queryString)) {
				$r['checked'] = $checked->num_rows > 0;
			}

			//Checa se tem um nó filho
			if($nodes = $mysqli->query("SELECT * FROM MENU WHERE parent_id = '". $r['id'] ."'")) {

				//determina o número de linha do resultado
				$count = $nodes->num_rows;

				if($count > 0) {

					$r['expanded'] = true;

					$r['children'] = array();

					while ($item = $nodes->fetch_assoc()) {
						
						$id = $item['id'];
						$queryString = "SELECT Menu_id FROM permissions ";
						$queryString .= "WHERE Group_id = '$groupId' ";
						$queryString .= "and Menu_id = '$id'";

						if($checked = $mysqli->query($queryString)) {

							$item['checked'] = $checked->num_rows > 0;
						}

						$item['leaf'] = true;
						$r['children'][] = $item;
					}
				} else {
					//se não tiver filhos
					$r['leaf'] = true;
				}
				$folder[] = $r;
			}
		}
	}
	//fechar conexão
	$mysqli->close();

	echo json_encode($folder);
?>