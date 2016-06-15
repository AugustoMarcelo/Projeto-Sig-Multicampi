Ext.define('Packt.view.unidade.UnidadesList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.unidadeslist',

	store: 'unidades',
	columnLines: true,
	initComponent: function() {
		var me = this;

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.unidade.Unidades');
		}

		Ext.apply(me, {
			columns: [
				{text: 'Código', dataIndex: 'codigo', width: '10%'},
				{text: 'Nome da Unidade', dataIndex: 'nomeUnidade', width: '50%'},
				{text: 'Responsável', dataIndex: 'responsavel', width: '40%'}
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