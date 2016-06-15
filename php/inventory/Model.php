<?php

	require("../db/db.php");	
	
	class Model {		

		private $baseFindQuery = 'SELECT [FIELDS] FROM [TABLE_NAME] WHERE [CONDITIONS] ORDER BY [ORDER_BY] LIMIT [START], [LIMIT]';

		private $baseFindCount = 'SELECT count(*) AS total FROM [TABLE_NAME] WHERE [CONDITIONS]';

		public function _construct() {

		}

		public function find($options) {
			$query = $this->baseFindQuery;

			if(array_key_exists('fields', $options)) {
				$query = str_replace('[FIELDS]', $options['fields'], $query);
			}
			if(array_key_exists('tableName', $options)) {
				$query = str_replace('[TABLE_NAME]', $options['tableName'], $query);
			}
			if(array_key_exists('conditions', $options)) {
				$query = str_replace('[CONDITIONS]', $options['conditions'], $query);
			}
			if(array_key_exists('order', $options)) {
				$query = str_replace('[ORDER_BY]', $options['order'], $query);
			}
			if(array_key_exists('start', $options)) {
				$query = str_replace('[START]', $options['start'], $query);
			}
			if(array_key_exists('limit', $options)) {
				$query = str_replace('[LIMIT]', $options['limit'], $query);
			}

			$query = $this->removeConstants($query);

			return $this->query($query);
		}

		public function findCount($options) {
			$query = $this->baseFindCount;

			if(array_key_exists('tableName', $options)) {
				$query = str_replace('[TABLE_NAME]', $options['tableName'], $query);
			}

			if(array_key_exists('conditions', $options)) {
				$query = str_replace('[CONDITIONS]', $options['conditions'], $query);
			}

			$query = $this->removeConstants($query);

			$result = $this->query($query);

			return $result[0];
		}

		private function removeConstants($query) {

			$contants = array('[FIELDS]', '[CONDITIONS]', '[ORDER_BY]', '[START]', '[LIMIT]');

			$defaultValues = array('*', '1=1', 'ID ASC', '0', '50');

			$query = str_replace($contants, $defaultValues, $query);

			return $query;
		}

		public function query($query) {
			global $mysqli;
			$result = $mysqli->query($query);

			return $this->formatResult($result);
		}

		private function formatResult($result) {
			$data = array();		
			while($row = $result->fetch_assoc()) {
				$data[] = $row;
			}

			return $data;
		}
	}

?>