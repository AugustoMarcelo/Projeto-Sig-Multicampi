Ext.define('Packt.view.protocolo.ProtocolosList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.protocoloslist',
	//frame: true,
	requires: [

	],

	store: 'Protocolos',
	columnLines: true,

	initComponent: function() {
		var me = this;

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.protocolo.Protocolos');
		}

		Ext.apply(me, {
			columns: [				
				{
					text: 'Movimentação', 
					dataIndex: 'movimentacao', 
					width: '11%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return "EMPRÉSTIMO";
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;border-left:4px solid #00B200;"';
							return "DEVOLUÇÃO";
						}
					}
				},
                {
					text: 'Tombo', 
					dataIndex: 'tombo', 
					width: '10%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return value;
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return value;
						}
					}
				},
                {
					text: 'Denominação', 
					dataIndex: 'denominacao', 
					width: '20%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return value;
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return value;
						}
					}
				},
                {
					text: 'Especificações', 
					dataIndex: 'especificacoes', 
					width: '20%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return value;
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return value;
						}
					}
				},
                {
					text: 'Mediador', 
					dataIndex: 'mediador', 
					width: '15%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return value;
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return value;
						}
					}
				},
                {
					text: 'Solicitante', 
					dataIndex: 'solicitante', 
					width: '13%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;"';
							return value;
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return value;
						}
					}
				},
                {
                	xtype: 'datecolumn', 
                	text: 'Data', 
                	dataIndex: 'data', 
                	format: 'd/m/Y H:i:s', 
                	width: '11%',
					renderer: function(value, metaData, record) {
						if(record.get("movimentacao") == "EMPRÉSTIMO") {
							metaData.tdAttr = 'style="background-color:#FF522C;color:#FFFFFF;border-right:8px solid #B22B0D;"';
							return Ext.Date.format(record.get("data"), 'd/m/Y H:i:s');
						} else {
							metaData.tdAttr = 'style="background-color:#8CFF82;color:#000000;"';
							return Ext.Date.format(record.get("data"), 'd/m/Y H:i:s');
						}
					}
                }
			],
			dockedItems: [								
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true,
					emptyMsg: 'Não há registros a serem exibidos',
					displayMsg: 'Mostrando {0} - {1} de {2} registro(s)'
				}				
			]
		});
		me.callParent(arguments);
		me.store.load();
	}
});
