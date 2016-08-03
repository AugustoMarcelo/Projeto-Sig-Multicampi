<?php
	require_once('../tcpdf/config/lang/bra.php');
	require_once('../tcpdf/tcpdf.php');
	require_once('../db/db.php');
	
	//Extendendo TCPDF com funções customizadas
	class MYPDF extends TCPDF {

		//Carregando a tabela de dados do arquivo
		public function LoadData($file) {
			//Ler linhas do arquivo
			$lines = file($file);
			$data = array();
			foreach ($lines as $line) {
				$data[] = explode(';', chop($line));
			}			
			return $data;
		}
				
		//Tabela colorida
		public function ColoredTable($header, $data) {			
			$this->SetFillColor(71, 71, 71);
			$this->SetTextColor(255);
			$this->SetDrawColor(210, 210, 210);
			$this->SetLineWidth(0.3);
			$this->SetFont('', 'B');
			//Header			
			/*$w = array(32, 33, 33, 33, 33, 33);
			$num_headers = count($header);
			
			for($i = 0; $i < $num_headers; ++$i) {
				$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
			}
			$this->Ln();
			//Restaturação de cor e fonte
			$this->SetFillColor(240, 240, 240);
			$this->SetTextColor(0);
			$this->SetFont('');*/
			//Data
			$fill = 0;			
			$id = 0;
			foreach ($data as $row) {
				if($id == 0) {
					$id = $row['id'];
					$w = array(32, 33, 33, 33, 33, 33);
					$num_headers = count($header);
					$this->Cell(32, 7, 'Servidor', 1, 0, 'C', 1);					
					$this->Cell(66, 7, $row['usuarioId'], 1, 0, 'C', 1);
					$this->Ln();
					for($i = 0; $i < $num_headers; ++$i) {
						$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
					}
					$this->Ln();
					//Restaturação de cor e fonte
					$this->SetFillColor(240, 240, 240);
					$this->SetTextColor(0);
					$this->SetFont('');
				} else if($id != $row['id']) {
					$this->Cell(array_sum($w), 0, '', 'T');
					$this->AddPage();
					$id = $row['id'];
					$this->SetFillColor(71, 71, 71);
					$this->SetTextColor(255);
					$this->SetDrawColor(210, 210, 210);
					$this->SetLineWidth(0.3);
					$this->SetFont('', 'B');
					//Header
					//$w = array(32, 70, 33, 33, 33, 33, 33);
					$w = array(32, 33, 33, 33, 33, 33);
					$num_headers = count($header);
					$this->Cell(32, 7, 'Servidor', 1, 0, 'C', 1);					
					$this->Cell(66, 7, $row['usuarioId'], 1, 0, 'C', 1);
					$this->Ln();
					for($i = 0; $i < $num_headers; ++$i) {
						$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
					}
					$this->Ln();
					//Restaturação de cor e fonte
					$this->SetFillColor(240, 240, 240);
					$this->SetTextColor(0);
					$this->SetFont('');
					//Data
					$fill = 0;							
				}
				/*
					@params
					{
						cell width, 
						cell height, 
						string a ser mostrada, 
						string com caracteres que representam a borda (Left, Right, Top, Bottom),
						
						String que representa o alinhamento do texto (Left, Right, Center, Justify) 
					}
				*/
								
				$this->Cell($w[0], 6, $row['dataPonto'], 'LR', 0, 'C', $fill);				
				//$this->Cell($w[1], 6, $row['usuarioId'], 'LR', 0, 'C', $fill);
				$this->Cell($w[1], 6, $row['entrada01'], 'LR', 0, 'C', $fill);
				$this->Cell($w[2], 6, $row['saida01'], 'LR', 0, 'C', $fill);				
				$this->Cell($w[3], 6, $row['entrada02'], 'LR', 0, 'C', $fill);
				$this->Cell($w[4], 6, $row['saida02'], 'LR', 0, 'C', $fill);				
				$this->Cell($w[5], 6, $row['totaldia'], 'LR', 0, 'C', $fill);
				$this->Ln(); //Executa uma quebra de linha
				$fill=!$fill; //Variável que informa se uma linha será transparente (FALSE) ou pintada (TRUE)												
			}
			$this->Cell(array_sum($w), 0, '', 'T');	
			//$this->Cell(32, 0, 'Teste', 'B');		
		} 
		/* 
			@Override
			Sobrescrevendo o método do rodapé para adicionar uma imagem
		*/
		public function Footer() {
			$cur_y = $this->y;
			$image_file = "../../resources/images/logo_dti.png";
			$this->Image($image_file, 15, 192, 10, "", "PNG", "", "B", false, 300, "", false, false, 0, false, false, false);
			$this->SetTextColorArray($this->footer_text_color);
			//set style for cell border
			$line_width = (0.85 / $this->k);
			$this->SetLineStyle(array('width' => $line_width, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => $this->footer_line_color));
			//print document barcode
			$barcode = $this->getBarcode();
			if (!empty($barcode)) {
				$this->Ln($line_width);
				$barcode_width = round(($this->w - $this->original_lMargin - $this->original_rMargin) / 3);
				$style = array(
					'position' => $this->rtl?'R':'L',
					'align' => $this->rtl?'R':'L',
					'stretch' => false,
					'fitwidth' => true,
					'cellfitalign' => '',
					'border' => false,
					'padding' => 0,
					'fgcolor' => array(0,0,0),
					'bgcolor' => false,
					'text' => false
				);
				$this->write1DBarcode($barcode, 'C128', '', $cur_y + $line_width, '', (($this->footer_margin / 3) - $line_width), 0.3, $style, '');
			}
			$w_page = isset($this->l['w_page']) ? $this->l['w_page'].' ' : '';
			if (empty($this->pagegroups)) {
				$pagenumtxt = $w_page.$this->getAliasNumPage().' / '.$this->getAliasNbPages();
			} else {
				$pagenumtxt = $w_page.$this->getPageNumGroupAlias().' / '.$this->getPageGroupAlias();
			}
			$this->SetY($cur_y);
			$this->Text(25, 191, "Departamento de Tecnologia da Informação");			
			//Print page number
			if ($this->getRTL()) {
				$this->SetX($this->original_rMargin);
				$this->Cell(0, 0, $pagenumtxt, 'T', 0, 'L');
			} else {
				$this->SetX($this->original_lMargin);
				$this->Cell(0, 0, $this->getAliasRightShift().$pagenumtxt, 'T', 0, 'R');
			}
		}
	}	

	$sqlParte1 = "SELECT DATE_FORMAT(p.dataPonto, '%d/%m/%Y') AS dataPonto, if(p.entrada01 IS NULL, '--:--:--', p.entrada01) AS entrada01, if(p.saida01 IS NULL, '--:--:--', p.saida01) AS saida01, if(p.entrada02 IS NULL, '--:--:--', p.entrada02) AS entrada02, if(p.saida02 IS NULL, '--:--:--', p.saida02) AS saida02, if(p.totaldia IS NULL, '--:--:--', p.totaldia) AS totaldia, u.name AS usuarioId, p.usuarioId AS id";
	$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id GROUP BY usuarioId, p.id DESC";
	$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras FROM pontospordia p, User u WHERE p.usuarioId = u.id GROUP BY usuario ASC, usuarioId;";
	$textoHorasTrabalhadas = "Servidores e horas totais de trabalho desde o início";
	if(isset($_GET["valorDoFiltro"]) && $_GET["valorDoFiltro"] != null && $_GET["valorDoFiltro"] != "") {
		$filtro = $_GET["valorDoFiltro"];
		
		if(isset($_GET['check']) && $_GET['check'] == 'true' ) {	
								
			$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id AND DATE_FORMAT(p.dataPonto, '%Y-%m') = '$filtro' GROUP BY usuarioId, p.id DESC";
			$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras FROM pontospordia p, User u WHERE p.usuarioId = u.id AND DATE_FORMAT(p.dataPonto, '%Y-%m') = '$filtro' GROUP BY usuario ASC, usuarioId;";
			$textoHorasTrabalhadas = "Servidores e horas totais de ".  date('m', strtotime($filtro))."/".date('Y', strtotime($filtro));
		} else {	
			$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id AND p.dataPonto = '$filtro' GROUP BY usuarioId, p.id DESC";
			$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras 
FROM pontospordia p, User u WHERE p.usuarioId = u.id AND p.dataPonto = '$filtro' GROUP BY usuario ASC, usuarioId;";
			$textoHorasTrabalhadas = "Servidores e horas totais de ".date('d/m/Y', strtotime($filtro));
		}
	}

	$result = array();
	if($resultdb = $mysqli->query($sqlCompleta)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($result, $record); //Adicionando elementos no final do array			
		}
		$resultdb->close();
	}
	
	
	$resultTotalHoras = array();
	if($resultdb = $mysqli->query($sqlHorasTrabalhadas)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($resultTotalHoras, $record); //Adicionando elementos no final do array			
		}
		$resultdb->close();
	}
	

	//Criar novo documento PDF
	$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('Usuário logado');
	$pdf->SetTitle('Pontos registrados');
	$pdf->SetSubject('SIG - Sistema Integrado de Gestão');
	$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
	
	$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

	//Setar margens
	$pdf->SetMargins(PDF_MARGIN_LEFT, 45, PDF_MARGIN_RIGHT);
	$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	$pdf->SetFooterMargin(20);

	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

	$pdf->setLanguageArray($l);

	$pdf->SetFont('helvetica', '', 10);
	
	//Adicionar uma página
	$pdf->AddPage();

	//Título das colunas
	$header = array("Data", "Entrada/1º Exp.", "Saída/1º Exp.", "Entrada/2º Exp.", "Saída/2º Exp.", "Total/Dia");
	$pdf->ColoredTable($header, $result);
	
	$pdf->AddPage();

	$pdf->Cell(250, 0, $textoHorasTrabalhadas, 0, 1, 'C');
	$pdf->Ln();
	
	$pdf->SetFillColor(71, 71, 71);
	$pdf->SetTextColor(255);
	$pdf->SetDrawColor(210, 210, 210);
	$pdf->Cell(60, 7, 'Servidores', 1, 0, 'C', 1);
	$pdf->Cell(40, 7, 'Total de horas mensal', 1, 0, 'C', 1);
	$pdf->Ln();
	$pdf->SetFillColor(240, 240, 240);
	$pdf->SetTextColor(0);
	$fill = 0;
	foreach ($resultTotalHoras as $row) {
		$pdf->Cell(60, 0, $row['usuario'], 'LRTB', 0, 'L', $fill);
		$pdf->Cell(40, 0, $row['totalhoras'], 'LRTB', 0, 'C', $fill);
		$fill = !$fill;
		$pdf->Ln();
	}
	$pdf->Output('PontosRegistrados.pdf', 'I');
?>