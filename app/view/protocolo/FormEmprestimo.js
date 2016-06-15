Ext.define('Packt.view.protocolo.FormEmprestimo', {
    extend: 'Ext.window.Window', 
    alias: 'widget.formemprestimo',   

    title: 'Empréstimo',
    modal: true,
    autoShow: true,
    height: 284,
    width: 380,                
    items: [
        {                         
            xtype: 'form',
            bodyPadding: 10,
            bodyBorder: true,                            
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: '30%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'id',
                    name: 'id'
                },
                {              
                    xtype: 'combobox',                                      
                    name: 'tombo',
                    itemId: 'comboEmprestimo',
                    fieldLabel: 'Tombo',
                    displayField: 'tombo',
                    /*displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{denominacao} | {tombo}',
                        '</tpl>'),*/
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '<div class="x-boundlist-item">',
                                '{denominacao} | {tombo}',
                            '</div>',
                        '</tpl>'),
                    valueField: 'tombo',
                    queryMode: 'local',
                    store: {
                        type: 'patrimonios',
                        filters: [//RETORNAR SOMENTE OS PATRIMÔNIOS QUE PODEM E NÃO ESTÃO EMPRESTADOS.
                            {
                                property: 'emprestavel', //"1" REPRESENTA O VALOR DE UM PATRIMÔNIO EMPRESTÁVEL
                                value: 1
                            },
                            {
                                property: 'emprestado', //"0" OU "NULL" REPRESENTA UM PATRIMÔNIO QUE NÃO ESTÁ EMPRESTADO
                                value: 0 || null
                            }
                        ]
                    },
                    listeners: {
                        select: function(combo, records, e0pts) {
                            var campoDesc = this.up('form').down('textfield[itemId=descricao]');
                            var campoDen  = this.up('form').down('textfield[name=denominacao]');
                            campoDesc.setValue(records[0].data.especificacoes);
                            campoDen.setValue(records[0].data.denominacao);
                        }
                    }                    
                },
                {
                    fieldLabel: 'Denominação',
                    name: 'denominacao',
                    readOnly: true
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Descrição',
                    name: 'descricao',
                    itemId: 'descricao',
                    readOnly: true
                },
                {
                    fieldLabel: 'Mediador',
                    name: 'mediador',                    
                    //disabled: true
                    readOnly: true
                },
                {
                    fieldLabel: 'Solicitante',
                    name: 'solicitante'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Data',
                    name: 'dataemprestimo',                
                    format: 'd/m/Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: new Date()
                }
        	],
            dockedItems: [
                {
                    dock: 'bottom',
                    xtype: 'toolbar',                    
                    layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
                    items: [                        
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            iconCls: 'cancel',
                            itemId: 'cancelar'
                        },
                        {
                            xtype: 'button',
                            text: 'Confirmar',
                            iconCls: 'confirmar',
                            itemId: 'confirmar'
                        }
                    ]
                }
            ]
    	}                                      
    ],
    initComponent: function() {        
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: 'php/security/importUserSession.php',
            success: function(conn, response, options, e0pts){
                var result = Packt.util.Util.decodeJSON(conn.responseText);                
                var componente = Ext.ComponentQuery.query('textfield[name=mediador]')[0];               
                componente.setValue(result.nome.toUpperCase());
            }
        });
        me.callParent(arguments);
    }
});