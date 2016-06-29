Ext.define('Packt.view.ponto_eletronico.JustificativasList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.justificativaslist',

    store: 'ponto_eletronico.Justificativas',
    columnLines: true,
    initComponent: function() {
        var me = this;
        
        if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.ponto_eletronico.Justificativas');
		}

        Ext.apply(me, {
            columns: [
                {                    
                    text: 'Ponto', 
                    dataIndex: 'idPonto'
                    // renderer: function(value, metaData, record) {
                    //     console.log(value);
                    //     var store = Ext.getStore('pontoeletronico');
                    //     var ponto = store.findRecord('id', value);
                    //     if (ponto != null) {
                    //         return ponto.get('dataPonto');

                    //     } else {
                    //         return "Não encontrado.";
                    //     }
                    // }
                },
                {xtype: 'datecolumn', format: 'H:i:s', text: 'Entrada/1º Exp.', dataIndex: 'entrada01'},
                {xtype: 'datecolumn', format: 'H:i:s', text: 'Saída/1º Exp.', dataIndex: 'saida01'},
                {xtype: 'datecolumn', format: 'H:i:s', text: 'Entrada/2º Exp.', dataIndex: 'entrada02'},
                {xtype: 'datecolumn', format: 'H:i:s', text: 'Saída/2º Exp.', dataIndex: 'saida02'},
                {xtype: 'datecolumn', format: 'd/m/Y', text: 'Data', dataIndex: 'dataJustificativa'}
            ],
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