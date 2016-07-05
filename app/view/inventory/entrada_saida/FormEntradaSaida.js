Ext.define('Packt.view.inventory.entrada_saida.FormEntradaSaida', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formentradasaida',

	store: 'Packt.store.inventory.Entradas_Saidas',

	requires: [
		'Packt.util.Util',		
	],		

	frame: true,
	bodyPadding: 2,		

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'grid',
			width: '70%',
			columnLines: true,
			viewConfig: {				
				listeners: {
					render: createTooltip
				}
			},
			store: 'Packt.store.inventory.Entradas_Saidas',			
			columns: [
				{
					width: '15%',
					text: 'Produto',
					dataIndex: 'produto'
				},
				{
					width: '10%',
					text: 'Quantidade',
					dataIndex: 'quantidade'
				},
				{
					width: '20%',
					text: 'Destino',
					dataIndex: 'destino'
				},
				{
					xtype: 'datecolumn',
					width: '15%',
					format: 'd-m-Y H:i:s',
					text: 'Data da Operação',
					dataIndex: 'dataOperacao'
				},
				{
					width: '30%',
					text: 'Usuário| Matrícula',
					dataIndex: 'User_id'
				},
				{
					width: '10%',
					text: 'Operação',
					dataIndex: 'operacao'
				}				

			],
			forceFit: true,		
			tbar: [				
				{
					xtype: 'combo',
					labelWidth: 40,
					itemId: 'comboEntradaSaida',
					fieldLabel: 'Filtrar',
					displayField: 'name',
					valueField: 'valor',
					queryMode: 'local',
					store: Ext.create('Ext.data.Store', {
						fields: ['valor', 'name'],
						data: [
							{"valor": "entrada", "name":"Entrada"},
							{"valor": "saida", "name":"Saída"},
							{"valor": "todos", "name":"Todos"}
						]
					}),
					listeners: {
						select: function(obj) {
							var grid = obj.up('grid');
							var liststore = grid.store;								
							liststore.proxy.extraParams = {
								action: 'filtrar_log',
								operacao: obj.getDisplayValue()
							},
							liststore.load();
						}
					}
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Exportar para PDF',
					itemId: 'exportar_pdf',
					iconCls: 'pdf'					
				}
			],
			dockedItems: [				
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					store: 'Packt.store.inventory.Entradas_Saidas',
					displayInfo: true,
					items: [
						{
							xtype: 'text',
							text: 'Coloque o mouse sobre um registro para ver as observações*',
							cls: 'infoText'
						}
					]
				}				
			]
		},
		{
			xtype: 'tbfill'
		},
		{
			xtype: 'form',
			bodyPadding: 10,
			width: '29%',			
			items: [
				{
					xtype: 'fieldset',
					title: 'Formulário',
					height: '43%',
					defaults: {
						afterLabelTextTpl: Packt.util.Util.required,
						anchor: '100%',
						allowBlank: false,
						labelWidth: 80
					},		
					items: [														
						{
							xtype: 'combobox',
							fieldLabel: 'Produto',
							forceSelection: true,
							pageSize: 1,
							name: 'produto',
							displayField: 'nome',							
							valueField: 'codigo',							
							queryMode: 'remote',
							store: 'inventory.Products',
							/*initComponent: function() {
								var me = this;
								Ext.apply(this, {
									store: Ext.create('Packt.store.inventory.Products', {
										pageSize: undefined,
										proxy: {
											type: 'ajax',
											url: 'php/inventory/products.php',
											reader: {
												type: 'json',
												root: 'data'
											},
											limitParam: undefined
										}
									})
								});
								Ext.form.field.ComboBox.prototype.initComponent.call(me);						
							},*/
							/*initComponent: function() {
								var me = this;								
								me.store = Ext.create('Packt.store.inventory.Products');							
								me.store.getProxy().limitParam = undefined;								
								Ext.form.field.ComboBox.prototype.initComponent.call(me);						
							},*/
							listeners: {//Evento do combobox para setar as informações do produto selecionado no fieldset de informações do produto
								select: function(combo, records, e0pts) {									
									if(combo.getValue() != "" || combo.getValue() != null) {
										//Query para pegar a referência dos campos a serem preenchidos com os valores do produto
										var nomeProduto = Ext.ComponentQuery.query('#produto');
										var codProduto = Ext.ComponentQuery.query('#codProduto');
										var qtdeProduto = Ext.ComponentQuery.query('#qtdeProduto');
										var qtdeMinProduto = Ext.ComponentQuery.query('#qtdeMinProduto');
										var descProduto = Ext.ComponentQuery.query('#descProduto');
										var imageProduto = Ext.ComponentQuery.query('#imageProduto');									

										//Setando os valores nos campos
										nomeProduto[0].setText('Produto: '+ records[0].data.nome);
										codProduto[0].setText('Código: '+ records[0].data.codigo);
										qtdeProduto[0].setText('Quantidade no Estoque: '+ records[0].data.quantidade);
										qtdeMinProduto[0].setText('Quantidade Mínima: '+ records[0].data.quantidadeMin);
										descProduto[0].setText('Descrição: '+ records[0].data.descricao);
										if (records[0].data.picture != null) {//Se não tiver imagem, coloque uma padrão
											imageProduto[0].setSrc('resources/productImages/'+records[0].data.picture);

										} else {
											imageProduto[0].setSrc('resources/productImages/sem_imagem.gif');										
										}

									} 
								}
							}							
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Quantidade',
							name: 'quantidade',
							msgTarget: 'under'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Destino',
							name: 'destino',
							msgTarget: 'under'
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Data',
							disabled: true,
							value: new Date(),
							name: 'dataOp'
						},
						{
							afterLabelTextTpl: '', //Override da configuração padrão
							allowBlank: true, //Override da configuração padrão
							xtype: 'textarea',
							fieldLabel: 'Observações',
							name: 'observacoes',
							rows: 6
						}								
					]			
				},
				{
					xtype: 'fieldset',
					itemId: 'infoDoProduto',
					title: 'Info do Produto',										
					height: '23%',
					//cls: '',
					defaults: {
						cls: 'infoDoProduto'
					},					
					items: [											
						{
							xtype: 'text',
							itemId: 'produto',
							text: 'Produto: '
						},
						{
							xtype: 'tbfill'//Separar uma  informação de outra
						},
						{
							xtype: 'text',
							itemId: 'codProduto',
							text: 'Código'
						},
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'text',
							itemId: 'qtdeProduto',
							text: 'Quantidade no Estoque: '
						},
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'text',
							itemId: 'qtdeMinProduto',
							text: 'Quantidade Mínima: '
						},	
						{
							xtype: 'tbfill'
						},					
						{
							xtype: 'text',
							itemId: 'descProduto',
							text: 'Descrição: '
						}
					]
				},
				{
					xtype: 'fieldset',
					title: 'Imagem do Produto',					
					height: '30%',
					items: [
						{
							xtype: 'image',
							itemId: 'imageProduto',							
        					width: '50%',                
        					src: ''
						}
					]
				}
			],
			rbar: [//Toolbar localizada no lado direito com dois botões
				{
					xtype: 'button',
					itemId: 'entrada',
					scale: 'large',
					text: 'Entrada',			
					iconCls: 'entrada',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					formBind: true
				},
				{
					xtype: 'tbseparator'
				},
				{	
					xtype: 'button',
					itemId: 'saida',
					scale: 'large',
					text: 'Saída',			
					iconCls: 'saida',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					formBind: true
				}
			]			
		}
	]
});

function createTooltip(view) {//Função para mostrar uma informação ao passar o mouse sobre um registro
	
	view.tip = Ext.create('Ext.tip.ToolTip', {
		target: view.el,
		delegate: view.itemSelector,
		trackMouse: true,
		dismissDelay: 15000,
		renderTo: Ext.getBody(),		
		listeners: {
			beforeShow: function(tip) {				
				var tooltip = view.getRecord(tip.triggerElement).get('observacoes');
								
				if(tooltip == "") {					
					tip.update("Nenhuma observação");					

				} else {
					tip.update(tooltip);					
					tip.on('show', function(){
						Ext.defer(tip.show, 10, tip);
					}, tip, {single: true});
				}
			}
		}
	});
}
