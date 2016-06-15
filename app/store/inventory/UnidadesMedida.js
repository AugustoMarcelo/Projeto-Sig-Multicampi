Ext.define('Packt.store.inventory.UnidadesMedida', {
    extend: 'Ext.data.Store',
    
    alias: 'store.unidadesmedida',
    requires: [
        'Packt.model.inventory.UnidadeMedida'
    ],

    model: 'Packt.model.inventory.UnidadeMedida',

    storeId: 'unidadesmedida',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/inventory/unidadesmedida.php',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});