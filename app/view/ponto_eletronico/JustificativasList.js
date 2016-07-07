Ext.define('Packt.view.ponto_eletronico.JustificativasList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.justificativaslist',

    store: 'ponto_eletronico.Justificativas',
    columnLines: true,
    initComponent: function() {
        var me = this;
        var other = Ext.getStore('pontoeletronico');

        if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.ponto_eletronico.Justificativas');
		}

        if(other == undefined || other == null) {
            other = Ext.create('Packt.store.ponto_eletronico.PontoEletronico');
            other.load();
        } 
        
        Ext.apply(me, {                     
            columns: {
                defaults: {
                    align: 'center'                    
                },                
                //ESCREVENDO AS COLUNAS COMO ITENS PODE-SE DEFINIR UMA CONFIGURAÇÃO PADRÃO PARA TODOS OS ELEMENTOS
                items: [
                    {
                        text: 'Servidor',
                        dataIndex: 'idPonto',
                        hidden: true,
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', value);
                            var userStore = Ext.getStore('users');

                            if (ponto != null) {
                                var user = userStore.findRecord('id', ponto.get('usuarioId'));
                                if (user != null) {
                                    return user.get('name');
                                } else {
                                    return 'Carregando funcionário...';
                                }    
                            } else {
                                return 'Carregando funcionário...';
                            }
                        }
                    },
                    {      
                        xtype: 'datecolumn',
                        format: 'd/m/Y',              
                        text: 'Ponto', 
                        dataIndex: 'idPonto',
                        //PARA QUE O RENDERER FUNCIONE, A STORE DEVE ESTAR PREVIAMENTE CARREGADA NA MEMÓRIA
                        renderer: function(value, metaData, record) {
                            var ponto = other.findRecord('id', value);                                                                     
                                                                            
                            if (ponto != null) {
                                return Ext.Date.format(ponto.get('dataPonto'), 'd/m/Y');

                            } else {
                                return 'Carregando...';
                            }
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Entrada/1º Exp.', 
                        dataIndex: 'entrada01',                                                
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', record.get('idPonto')),
                                pontoFormat = Ext.Date.format(ponto.get('entrada01'), 'H:i:s'),
                                valueFormat = Ext.Date.format(value, 'H:i:s');
                            if (valueFormat != pontoFormat) {
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';
                            }
                            return value ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Saída/1º Exp.', 
                        dataIndex: 'saida01',                                                
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', record.get('idPonto'));

                            if (value != ponto.get('saida01')) {                                                                
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';                                      
                            }
                            return value ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Entrada/2º Exp.', 
                        dataIndex: 'entrada02',                                                
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', record.get('idPonto'));

                            if (value != ponto.get('entrada02')) {                                
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';                                                                                                                                                                          
                            }
                            return value ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Saída/2º Exp.', 
                        dataIndex: 'saida02',                                                
                        renderer: function (value, metaData, record) {     
                            var ponto = other.findRecord('id', record.get('idPonto'));

                            if (value != ponto.get('saida02')) {
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';
                            }                       
                            return value ? Ext.Date.format(value, 'H:i:s') : '--:--:--';
                        }                        
                    },
                    {xtype: 'datecolumn', format: 'd/m/Y', text: 'Data (Justificativa)', dataIndex: 'dataJustificativa'}
                ]                
            },                                                
            forceFit: true,                                             //FORÇA AS COLUNAS DO GRID A SE ENCAIXAREM E NÃO CRIAR A BARRA HORIZONTAL NO RODAPÉ DO MESMO
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: me.store,
                    dock: 'bottom',
                    displayInfo: true,
                    emptyMsg: 'Não existem registros a serem exibidos',
                    displayMsg: 'Mostrando {0} - {1} de {2} registro(s)'
                }
            ]
        });
        me.callParent(arguments);
        //me.store.load();
    }
});