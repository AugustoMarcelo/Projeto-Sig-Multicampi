Ext.define('Packt.view.ponto_eletronico.Justificativa', {
    extend: 'Ext.panel.Panel',
    frame: true,
    alias: 'widget.justificativa',

    requires: [

    ],

    layout: 'fit',

    items: [
        {
            xtype: '',
            emptyText: 'Nenhuma justificativa de ponto cadastrada...'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Editar',
                    tooltip: 'Editar a justificativa',
                    itemId: 'edit',
                    iconCls: 'edit'
                }
            ]
        }
    ]
});