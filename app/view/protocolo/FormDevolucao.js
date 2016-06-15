Ext.define('Packt.view.protocolo.FormDevolucao', {
    extend: 'Ext.window.Window',  
    alias: 'widget.formdevolucao',  
    title: 'Devolução',
    modal: true,
    autoShow: true,
    height: 379,
    width: 480,    
    //bodyPadding: 10,            
    items: [
        {                         
            xtype: 'form',
            bodyPadding: 10,
            //frame: true,
            //margin: '0 0 10 0',
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                disabled: true,
                labelWidth: '40%'
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
                    itemId: 'comboDevolucao',
                    fieldLabel: 'Tombo',
                    displayField: 'tombo',
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '<div class="x-boundlist-item">',
                                '{denominacao} | {tombo}',
                            '</div>',
                        '</tpl>'),
                    valueField: 'tombo',
                    queryMode: 'remote',
                    disabled: false,
                    store: {
                        type: 'patrimonios',
                        filters: [{//FILTRO UTILIZADO PARA RETORNAR SOMENTE OS PATRIMÔNIOS QUE ESTÃO EMPRESTADOS
                            property: 'emprestado',
                            value: 1
                        }]
                    },
                    listeners: {
                        select: function(combo, records, e0pts) {                                                        
                            var campoDesc = Ext.ComponentQuery.query('formdevolucao textfield[name=descricao]')[0];
                            campoDesc.setValue(records[0].data.especificacoes);
                            //Campos que serão preenchidos com os valores retornados do banco
                            var campoMediador = Ext.ComponentQuery.query('formdevolucao textfield[name=mediadorEmprestimo]')[0];
                            var campoSolicitante = Ext.ComponentQuery.query('formdevolucao textfield[name=solicitante]')[0];
                            var campoDataEmprestimo = Ext.ComponentQuery.query('formdevolucao datefield[name=dataemprestimo]')[0];
                            /* REQUEST QUE BUSCA NO BANCO OS DADOS REFERENTES AO TOMBO SELECIONADO
                             * EX.: QUEM SOLICITOU E EMPRESTOU O PATRIMÔNIO E A DATA.
                             * 
                             * NESSE RETORNO ESTARÃO OS DADOS REFERENTES AO ÚLTIMO EMPRÉSTIMO DESSE PATRIMÔNIO.
                            */
                            Ext.Ajax.request({
                                method: 'POST',
                                url: 'php/protocolo/protocolos.php',
                                params: {
                                    tombo: combo.getValue(),
                                    start: 0,
                                    limit: 25
                                },
                                success: function(conn, response, options, e0pts) {
                                    var result = Packt.util.Util.decodeJSON(conn.responseText);                                    
                                    campoMediador.setValue(result.data[0].mediador);
                                    campoSolicitante.setValue(result.data[0].solicitante);
                                    var date = new Date(result.data[0].dataEmprestimo);
                                    campoDataEmprestimo.setValue(date);                                    
                                }
                            });
                        }
                    }                                        
                },                            
                {
                    xtype: 'textarea',
                    fieldLabel: 'Descrição',
                    name: 'descricao',
                    readOnly: true                                
                },
                {
                    fieldLabel: 'Mediador/Empréstimo',
                    name: 'mediadorEmprestimo',
                    readOnly: true
                },
                {
                    fieldLabel: 'Solicitante',
                    name: 'solicitante',
                    readOnly: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Data do Empréstimo',
                    name: 'dataemprestimo',
                    format: 'd/m/Y H:i:s'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mediador/Devolução',
                    name: 'mediadorDevolucao',
                    readOnly: true,
                    disabled: false                    
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Data de Devolução',
                    name: 'datadevolucao',  
                    format: 'd/m/Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',                  
                    value: new Date(),
                    disabled: false
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Observação',
                    disabled: false,
                    emptyText: 'Informe se o objeto devolvido retornou com algum problema não antes conhecido.'
                }
            ],
            dockedItems: [
                {
                    dock: 'bottom',
                    xtype: 'toolbar',
                    //ui: 'footer',
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
        Ext.Ajax.request({
            method: 'POST',
            url: 'php/security/importUserSession.php',
            success: function(conn, response, options, e0pts) {
                var result = Packt.util.Util.decodeJSON(conn.responseText);
                var campoMediadorDevolucao = Ext.ComponentQuery.query('formdevolucao textfield[name=mediadorDevolucao]')[0];
                campoMediadorDevolucao.setValue(result.nome.toUpperCase());
            }
        });
        this.callParent(arguments);
    }
});