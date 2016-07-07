Ext.define('Packt.controller.ponto_eletronico.Justificativas', {
    extend: 'Ext.app.Controller',

    views: [
        'ponto_eletronico.Justificativas'
    ],

    stores: [
        'ponto_eletronico.Justificativas'
    ],

    init: function (application) {
        this.control({
            "justificativaslist": {
                render: this.onRender,
                cellclick: this.onCellClick,
                itemmouseleave: this.onItemMouseLeave
            }
        });
    },

    /**
     * EVENTO QUE MOSTRA A COLUNA COM OS NOMES DAS PESSOAS QUE JUSTIFICARAM ALGUM PONTO.
     * SOMENTE USUÁRIOS COM LEVEL ESPECÍFICO PODERÃO VISUALIZAR ESSA COLUNA.
     */
    onRender: function (component, options) {
        Ext.Ajax.request({
            url: 'php/security/importUserSession.php',
            success: function (conn, response, options, e0pts) {
                var result = Packt.util.Util.decodeJSON(conn.responseText);
                if (result.level < 3) {
                    for (var i = 0; i < component.columns.length; i++) {
                        component.columns[i].setVisible(true);
                    }
                }
            }
        });
    },

    /**
     * EVENTO QUE DESTROI A TOOLTIP SEMPRE QUE O USUÁRIO PASSA O MOUSE DE UMA LINHA DO GRID PARA OUTRA
     */
    onItemMouseLeave: function (view, record, item, index, e, eOpts) {
        if (view.tip) {
            view.tip.destroy();
        }
    },

    /**
     * EVENTO QUE GERENCIA O CLIQUE EM UMA CÉLULA DO GRID E MOSTRA UMA TOOLTIP AO USUÁRIO
     */
    onCellClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var store = Ext.getStore('pontoeletronico');                                    //REFERÊNCIA DA STORE DOS PONTOS
        var cellIndexStart = 0;                                                         //VARIÁVEL QUE DETERMINARÁ A PRIMEIRA CÉLULA QUE CONTÉM HORÁRIO
        var cellIndexEnd = 5;                                                           //VARIÁVEL QUE DETERMINARÁ A ÚLTIMA CÉLULA QUE CONTÉM HORÁRIO

        if (view.tip) {
            view.tip.destroy();
            view.tip = null;
        }

        if (view.getGridColumns().length > 6) {                                         //SE O GRID MOSTRAR MAIS DE 6 COLUNAS, OS ÍNDICES DAS CÉLULAS QUE CONTÉM HORÁRIOS SERÃO ALTERADOS
            cellIndexStart = 1;
            cellIndexEnd = 6;
        }
        
        if (cellIndex > cellIndexStart && cellIndex < cellIndexEnd) {                   //VERIFICANDO SE O USUÁRIO ESTÁ CLICANDO EM UMA CÉLULA QUE CONTÉM HORÁRIO
            view.tip = Ext.create('Ext.tip.ToolTip', {
                itemId: 'tooltip-horario',
                autoShow: false,
                showDelay: 0,
                stateful: false,
                target: view.el,
                width: 100,
                title: 'Horário original',
                delegate: view.cellSelector,
                trackMouse: false,
                autoHide: true,                
            });
            var ponto = store.findRecord('id', record.get('idPonto'));
            var horario;
            if (cellIndex == (cellIndexStart + 1)) {                                        //VERIFICANDO QUAL O ÍNDICE DA CÉLULA CLICADA PELO USUÁRIO PARA PEGAR O HORÁRIO DO EXPEDIENTE CORRESPONDENTE
                horario = ponto.get('entrada01');
            } else if (cellIndex == (cellIndexStart + 2)) {
                horario = ponto.get('saida01');
            } else if (cellIndex == (cellIndexStart + 3)) {
                horario = ponto.get('entrada02');
            } else if (cellIndex == (cellIndexStart + 4)) {
                horario = ponto.get('saida02');
            }
            horario = horario != null ? Ext.Date.format(horario, 'H:i:s') : "--:--:--";
            view.tip.update(horario);                                                       //ATUALIZANDO A TOOLTIP COM O HORÁRIO INFORMADO PELO USUÁRIO NO MOMENTO QUE O PONTO FOI BATIDO
        }
    }
});