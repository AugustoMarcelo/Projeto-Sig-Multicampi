Ext.define('Packt.view.ponto_eletronico.Justificativas', {
    extend: 'Ext.panel.Panel',
    frame: true,
    alias: 'widget.justificativas',

    requires: [
        'Packt.view.ponto_eletronico.JustificativasList'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'justificativaslist',
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
                    disabled: true,
                    itemId: 'edit',
                    iconCls: 'edit'
                }
            ]
        }
    ]
});