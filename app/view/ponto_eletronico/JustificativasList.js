Ext.define('Packt.view.ponto_eletronico.JustificativasList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.justificativaslist',

    //RECOMENDADO REFERENCIAR PELO ALIAS
    // store: {
    //     type: 'justificativas'
    // },
    //NÃO RECOMENDADO UTILIZAR storeId
    store: 'justificativas',
    columnLines: true,
    initComponent: function() {
        var me = this;
        var other = Ext.getStore('pontoeletronico');                

        //NÃO RECOMENDADO
        if(Ext.isString(me.store)) {
            me.store = Ext.create('Packt.store.ponto_eletronico.Justificativas');
        }

        if(other == undefined || other == null) {                                    
            other = Ext.create('Packt.store.ponto_eletronico.PontoEletronico');
            other.load({
                params: {
                    start: 0,
                    limit: 100000
                }                
            });                        
        } else {            
            other.load({
                params: {
                    start: 0,
                    limit: 100000
                }
            });            
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
                        dataIndex: 'nomeUsuario',                                                
                        hidden: true                        
                    },
                    {      
                        xtype: 'datecolumn',
                        format: 'd/m/Y',              
                        text: 'Ponto',                         
                        dataIndex: 'dataPonto'                        
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
                            if ((valueFormat != pontoFormat) && (value != null)) {                            
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';
                            } else if(record.get('dia') == 1) {
                                metaData.tdAttr = 'style="background-color:#BABABA;color:#000000;border-left:2px solid #000000;"';
                                return 'FALTOU';
                            }

                            if(value) {                                                                                                
                                return Ext.Date.format(value, 'H:i:s');                                
                            } else if(ponto.get('entrada01')) {                                
                                return Ext.Date.format(ponto.get('entrada01'), 'H:i:s');
                            } else {                                
                                return '--:--:--';
                            }                            
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Saída/1º Exp.', 
                        dataIndex: 'saida01',                                                
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', record.get('idPonto'));
                            
                            if ((value != ponto.get('saida01')) && (value != null)) {                                                                
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';                                      
                            } else if(record.get('dia') == 1) {
                                metaData.tdAttr = 'style="background-color:#BABABA;color:#000000;"';
                                return 'FALTOU';
                            }

                            if(value) {
                                return Ext.Date.format(value, 'H:i:s');
                            } else if(ponto.get('saida01')) {
                                return Ext.Date.format(ponto.get('saida01'), 'H:i:s');
                            } else {                            
                                return '--:--:--';
                            }
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Entrada/2º Exp.', 
                        dataIndex: 'entrada02',                                                
                        renderer: function (value, metaData, record) {
                            var ponto = other.findRecord('id', record.get('idPonto'));

                            if ((value != ponto.get('entrada02')) && (value != null)) {                                
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';                                                                                                                                                                          
                            } else if(record.get('dia') == 1) {
                                metaData.tdAttr = 'style="background-color:#BABABA;color:#000000;"';
                                return 'FALTOU';
                            }

                            if(value) {
                                return Ext.Date.format(value, 'H:i:s');
                            } else if(ponto.get('entrada02')) {
                                return Ext.Date.format(ponto.get('entrada02'), 'H:i:s');
                            } else {
                                return '--:--:--';
                            }
                        }
                    },
                    {
                        xtype: 'datecolumn', 
                        format: 'H:i:s', 
                        text: 'Saída/2º Exp.', 
                        dataIndex: 'saida02',                                                
                        renderer: function (value, metaData, record) {     
                            var ponto = other.findRecord('id', record.get('idPonto'));

                            if ((value != ponto.get('saida02')) && (value != null)) {
                                metaData.tdAttr = 'style="background-color:#5DFF4F;color:#3300FF;border-left:2px solid #3300FF;"';
                            } else if(record.get('dia') == 1) {
                                metaData.tdAttr = 'style="background-color:#BABABA;color:#000000;"';
                                return 'FALTOU';
                            } 

                            if(value) {
                                return Ext.Date.format(value, 'H:i:s');
                            } else if(ponto.get('saida02')) {
                                return Ext.Date.format(ponto.get('saida02'), 'H:i:s');
                            } else {
                                return '--:--:--';
                            }                            
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