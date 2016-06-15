Ext.define('Packt.view.localizacao.LocalizacoesList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.localizacoeslist',

	store: 'localizacoes',

	columnLines: true,
	forceFit: true,
	initComponent: function() {
		var me = this;

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.localizacao.Localizacoes');
		}

		Ext.apply(me, {
			columns: [
				{text: 'Sala', dataIndex: 'numSala', width: '10%'},
				{text: 'Localização', dataIndex: 'nomeDoLocal', width: '50%'},
				{text: 'Responsável', dataIndex: 'responsavel', width: '40%'}
			],

			dockedItems: [

			]
		});

		me.callParent(arguments);		
		//me.store.load();
	}
});