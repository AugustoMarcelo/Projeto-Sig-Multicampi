Ext.define('Packt.view.inventory.ProductsList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.productslist',
	//frame: true,
	requires: [
		'Ext.ux.form.SearchField',
		'Ext.toolbar.Spacer'
	],
	store: 'Products',
	columnLines: true,

	initComponent: function() {
		var me = this;

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.inventory.Products');
		}

		Ext.apply(me, {
			columns: [
				{
					width: '10%',
					dataIndex: 'codigo',
					text: 'Código'			
				},
				{
					width: '20%',
					dataIndex: 'nome',
					text: 'Nome'
				},
				{
					width: '30%',
					dataIndex: 'descricao',
					text: 'Descrição'
				},
				{
					width: '6%',
					dataIndex: 'quantidade',
					text: 'Quantidade',
					align: 'center'
				},
				{
					width: '9%',
					dataIndex: 'quantidadeMin',
					text: 'Quantidade Mínima',
					align: 'center'
				},
				{
					xtype: 'datecolumn',
					format: 'd/m/Y',
					width: '9%',
					dataIndex: 'dataCadastro',
					text: 'Data de Cadastro',
					align: 'center'
				},
				{
					width: '9%',
					dataIndex: 'Sigla_id',
					text: 'Unidade de Medida',
					align: 'center',
					renderer: function(value, metaData, record ){ 
						var siglasStore = Ext.getStore('unidadesmedida');			
						var sigla = siglasStore.findRecord('id', value);						
						return sigla != null ? sigla.get('name') : value;
					}
				},
				{
					width: '7%',
					dataIndex: 'tipoMaterial',
					text: 'Material',					
					align: 'center',
					renderer: function(value, metaData, record) {
						var materiaisStore = Ext.getStore('materiais');												
						var material = materiaisStore.findRecord('id', value);					
						return material != null ? material.get('name') : value;
						/*if(Ext.getStore('materiais') != null) {						
							var materiaisStore = Ext.getStore('materiais');
						} else {
							var materiaisStore = Ext.create('Packt.store.inventory.Materiais');
						}							
						var material = materiaisStore.findRecord('id', value);						
						return material != null ? material.get('name') : value;*/
					}
				}
			],
			forceFit: true,
			viewConfig: {
				stripeRows: true,				
				getRowClass: function(record, index, rowParams, store) {
					if(record.get('quantidade') <= record.get('quantidadeMin')) {
						return "vermelho";

					} else {
						return "preto";
					}
				}
			},

			dockedItems: [
				{
					dock: 'top',
					xtype: 'toolbar',
					items: [
						{							
							fieldLabel: 'Pesquisar pelo nome',
							itemId: 'searchfield-filtro',
							labelWidth: 110,
							flex: 1,
							xtype: 'searchfield',
							store: me.store,
							paramName: 'filter',
							margin: '0 0 0 5',
							onTrigger2Click: me.onSearchFieldTrigger2Click
						},
						{
							xtype: 'tbspacer',
							width: 50
						},
						{
							xtype: 'combo',
							itemId: 'combo-material',
							fieldLabel: 'Tipo de material',
							labelWidth: 90,							
							store: {
								//type:'inventory.Materiais',
								type: 'materiais',
								allTextField: 'name'
							},
							displayField: 'name',
							valueField: 'id',
							query: 'local',
							listeners: {
								select: function(obj) {
									var objParam = obj.getValue();
									if(obj.getValue() == null) {
										objParam = obj.getDisplayValue();
									}									
									var grid = obj.up('grid');
									var liststore = grid.store;
									var searchField = Ext.ComponentQuery.query('#searchfield-filtro')[0];

									liststore.proxy.extraParams = {
										action: 'filtrar_material',
										operacao: objParam,
										searchValue: searchField.getValue()
									},														
									liststore.load();
								}
							}
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true,
					emptyMsg: 'Não há registros a serem exibidos',
					displayMsg: 'Exibindo {0} - {1} de {2} registro(s)',
					items: [
						{
							xtype: 'text',
							text: 'Os itens em vermelho representam produtos com baixo estoque*',
							cls: 'infoText'
						}
					]
				}
			]
		});
		
		me.callParent(arguments);
		me.store.load();
	},

	onSearchFieldTrigger2Click: function() {
		var searchField = this,
			value = searchField.getValue(),
			store = searchField.store;

		var valorCombo = Ext.ComponentQuery.query('#combo-material')[0];		
		if(value.length >= 0) {
			//Passando os valores a serem resgatados no SERVER 
			//param1 : Valor a ser recuperado no backend
			//param2 : Valor selecionado no combo
			store.getProxy().setExtraParam('combo-material', valorCombo.getValue());

			store.filter({
				id: searchField.paramName,
				property: searchField.paramName,
				value: value
			});
			searchField.hasSearch = true;
			searchField.triggerCell.item(0).setDisplayed(true);
			searchField.updateLayout();
		}
	}
});