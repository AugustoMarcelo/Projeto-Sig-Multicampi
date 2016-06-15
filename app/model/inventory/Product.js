Ext.define('Packt.model.inventory.Product', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id'},
        {name: 'nome'},
        {name: 'Sigla_id'},
        {name: 'codigo'},
        {name: 'quantidade', type: 'integer'},
        {name: 'quantidadeMin', type: 'integer'},
        {name: 'descricao'},
        {name: 'picture'},
        {name: 'tipoMaterial'},
        {name: 'dataCadastro' , type: 'date', dateFormat: 'Y-m-d'}
    ]
});