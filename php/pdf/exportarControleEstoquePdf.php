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
			$w = array(50, 80, 30, 47, 35, 25);
			$num_headers = count($header);
			//print_r($data);
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
			foreach ($data as $row) {
				$this->Cell($w[0], 6, $row['produto'], 'LR', 0, 'L', $fill);
				$this->Cell($w[1], 6, $row['User_id'], 'LR', 0, 'L', $fill);				
				$this->Cell($w[2], 6, $row['quantidade'], 'LR', 0, 'C', $fill);
				$this->Cell($w[3], 6, $row['destino'], 'LR', 0, 'L', $fill);
				$this->Cell($w[4], 6, $row['dataOperacao'], 'LR', 0, 'C', $fill);
				$this->Cell($w[5], 6, $row['operacao'], 'LR', 0, 'C', $fill);							
				$this->Ln(); //Executa uma quebra de linha
				$fill=!$fill; //Variável que informa se uma linha será transparente (FALSE) ou pintada (TRUE)
			}
			$this->Cell(array_sum($w), 0, '', 'T');
		} 

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
	
	$sql = "SELECT produto, User_id, quantidade, destino, dataOperacao, operacao FROM estoque LIMIT 0, 100";			
	if(isset($_GET["operacao"]) && $_GET["operacao"] != "Todos" && $_GET["operacao"] != "") {
		$operacao = $_GET["operacao"];
		$sql = "SELECT produto, User_id, quantidade, destino, dataOperacao, operacao FROM estoque WHERE operacao = '$operacao' LIMIT 0, 100";			
	}

	$result = array();
	if($resultdb = $mysqli->query($sql)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($result, $record); //Adicionando elementos no final do array
		}

		$resultdb->close();
	}

	//Criar novo documento PDF
	$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('Usuário logado');
	$pdf->SetTitle('Exportar PDF');
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
	$header = array('Produto', 'Usuário| Matrícula', 'Quantidade', 'Destino', 'Data da Operação', 'Operação');

	$pdf->ColoredTable($header, $result);

	$pdf->Output('ControleEstoque_pdf.pdf', 'I');	
	
?>