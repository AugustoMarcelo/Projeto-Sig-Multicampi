Ext.define('Packt.store.ponto_eletronico.Justificativas', {
    extend: 'Ext.data.Store',

    alias: 'store.justificativas',
    requires: [
        'Packt.model.ponto_eletronico.Justificativa'
    ],

    model: 'Packt.model.ponto_eletronico.Justificativa',

    storeId: 'justificativas',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/ponto_eletronico/listaJustificativas.php',

        reader: {
            type: 'json',
            root: 'data'
        }
    }
});