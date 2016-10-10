Ext.define('Packt.view.patrimonio.FormPatrimonio', {
	extend: 'Ext.window.Window',
	alias: 'widget.formpatrimonio',
	title: 'Adicionar Patrimônio',
	modal: true,
	autoShow: true,
	height: 410,
	width: 700,

	requires: ['Ext.ux.TextMaskPlugin'],
	items: [
		{
			xtype: 'form',
			bodyPadding: 10,									
			layout: {
				type: 'hbox',
				align: 'stretch'
			},

			defaults: {
				xtype: 'fieldset',
				height: 330,
				bodyPadding: 10
			},

			items: [
				{					
					title: 'Dados do Patrimônio',									
					flex: 1,				
					margin: 'auto 5 auto auto',				
					defaults: {
						xtype: 'textfield',
						//fieldStyle: 'text-align: left;',						
						anchor: '100%',
						labelWidth: '45%'						
					},
					items: [
						{
							xtype: 'hiddenfield',
							fieldLabel: 'id',
							name: 'id'
						},
						{					
							fieldLabel: 'Tombo',
							name: 'tombo'
							//value: 112121211 //Valor pré-definido
						},
						{
							fieldLabel: 'Denominação',
							name: 'denominacao'/*,
							value: 'teste'*/
						},
						{
							xtype: 'textarea',
							fieldLabel: 'Especificações',
							name: 'especificacoes'/*,
							value:' teste'*/	
						},
						{
							xtype: 'combo',
							name: 'tipoMaterial',
							fieldLabel: 'Material',
							displayField: 'name',
							valueField: 'id',
							queryMode: 'local',
							store: 'inventory.Materiais'						
						},
						{
							fieldLabel: 'Preço',												
							plugins: 'textmask',							
							name: 'preco',
							mask: 'R$ #9.999.999,99',
							money: true,
							useMask: true							
						},
						{
							xtype: 'combo',
							name: 'codigo_unidade',
							fieldLabel: 'Unidade',
							displayField: '{codigo} {nomeUnidade}',														
							displayTpl: Ext.create('Ext.XTemplate',
		                        '<tpl for=".">',		                            
									'{codigo} - {nomeUnidade}',
		                        '</tpl>'), 
							tpl: Ext.create('Ext.XTemplate',
		                        '<tpl for=".">',
		                            '<div class="x-boundlist-item">',
		                                '{codigo} - {nomeUnidade}',
		                            '</div>',
		                        '</tpl>'),
							valueField: 'id',
							queryMode: 'local',
							store: 'unidade.Unidades'
						},
						{
							xtype: 'combobox',
							fieldLabel: 'Localização',
							name: 'localizacao',
							//displayField: 'numSala', //TENTAR COLOCAR O NÚMERO DA SALA E O RESPONSÁVEL
							tpl: Ext.create('Ext.XTemplate',
								'<tpl for=".">',
									'<div class="x-boundlist-item">',
										'{numSala} - {nomeDoLocal}',
									'</div>',
								'</tpl>'),
							displayTpl: Ext.create('Ext.XTemplate',
								'<tpl for=".">',
									'{numSala} - {nomeDoLocal}',
								'</tpl>'),
							emptyText: 'Informe a localização do patrimônio',							
							valueField: 'id', //PEGAR O ID E REFERENCIAR COMO CHAVES ESTRANGEIRA
							queryMode: 'remote',
							store: 'localizacao.Localizacoes'
						},
						{
							xtype: 'combo',
							name: 'situacao',
							fieldLabel: 'Situação',
							displayField: 'name',
							valueField: 'valor',
							forceSelection: true,							
							store: Ext.create('Ext.data.Store', {
								fields: ['name', 'valor'],
								data: [
									{"name":"Em uso", "valor":"EM USO"},
									{"name":"Manutenção", "valor":"MANUTENÇÃO"},
									{"name":"Quebrado", "valor":"QUEBRADO"},
									{"name":"Almoxarifado", "valor": "ALMOXARIFADO"}
								]
							})
						},
						{
							xtype: 'checkbox',
							name: 'emprestavel',
							fieldLabel: 'Emprestável',
							inputValue: true,
							checked: false,
							itemId: 'emprestavel'/*,
							handler: function(checkbox, checked) {
								console.log(checkbox.getValue());
							}*/
						},
						{
							xtype: 'filefield',
		                	fieldLabel: 'Imagem',
		                	name: 'imagem',
		                	allowBlank: true,
		                	afterLabelTextTpl: '',                            
		                    buttonText: '',
		                    buttonConfig: {
		                        iconCls: 'image'
		                    }
						}
					]
				},				
				{					
					title: 'Imagem',						
					margin: 'auto auto auto auto',
					height: 280,
					//flex: 1,								
					items: [
						{
							xtype: 'image',
							itemId: 'patrimonioImage',
							bodyPadding: 10,
							height: 280,
							width: 280
						}
					]
				}
			]
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer',
			layout: {
				pack: 'end',
				type: 'hbox'
			},
			items: [
				{
					xtype: 'button',
					text: 'Cancelar',
					itemId: 'cancelar',
					iconCls: 'cancel'
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					text: 'Salvar',
					itemId: 'salvar',
					iconCls: 'save'
				}
			]
		}
	]
});