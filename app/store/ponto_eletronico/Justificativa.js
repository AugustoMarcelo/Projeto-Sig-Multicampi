Ext.define('Packt.store.ponto_eletronico.Justificativa', {
    extend: 'Ext.data.Store',

    alias: 'store.justificativa',
    requires: [
        'Packt.model.ponto_eletronico.Justificativa'
    ],

    model: 'Packt.model.ponto_eletronico.Justificativa',

    storeId: 'justificativa',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '',

        reader: {
            type: 'json',
            root: 'data'
        }
    }
});