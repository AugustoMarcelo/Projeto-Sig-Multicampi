Ext.define('Packt.store.inventory.Materiais', {
    extend: 'Ext.data.Store',
    //allTextField: 'name',
    alias: 'store.materiais',
    requires: [
        'Packt.model.inventory.Material'
    ],

    model: 'Packt.model.inventory.Material',

    storeId: 'materiais',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/inventory/material.php',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});