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
				{text: 'Movimentação', dataIndex: 'movimentacao', width: '12%'},
                {text: 'Tombo', dataIndex: 'tombo', width: '10%'},
                {text: 'Denominação', dataIndex: 'denominacao', width: '20%'},
                {text: 'Descrição', dataIndex: 'descricao', width: '20%'},
                {text: 'Mediador', dataIndex: 'mediador', width: '15%'},
                {text: 'Solicitante', dataIndex: 'solicitante', width: '13%'},
                {
                	xtype: 'datecolumn', 
                	text: 'Data', 
                	dataIndex: 'data', 
                	format: 'd-m-Y H:i:s', 
                	width: '10%'
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
