Ext.define('Packt.controller.security.Users', {
	extend: 'Ext.app.Controller',

	requires: [
        'Packt.util.Util',
        'Packt.util.Alert'
    ],

	views: [
		'security.Users',
		'security.Profile',
        'security.log.UsersLogList' 
	],

	stores: [
        'security.Groups',
        'security.Users'
    ],

	refs: [
        {
            ref: 'users',
            selector: 'users'
        },
        {
            ref: 'usersList',
            selector: 'userslist'
        },
        {
            ref: 'profile',
            selector: 'profile',
            autoCreate: true,
            xtype: 'profile'
        },
        {
        	ref: 'userPicture',
        	selector: 'profile image'
        },
        {
            ref: 'usersLogList',
            selector: 'usersloglist',
            autoCreate: true,
            xtype: 'usersloglist'
        }
    ],

	init: function(application) {
		this.control({
			"userslist": { 
				render: this.onRender,
                selectionchange: this.onHabilitarBotoes
			},            
			"users button#add": {
				click: this.onButtonClickAdd
			},
			"users button#edit": {
				click: this.onButtonClickEdit
			},
			"users button#delete": {
				click: this.onButtonClickDelete
			},
			"profile button#save": {
				click: this.onButtonClickSave
			},
			"profile button#cancel": {
				click: this.onButtonClickCancel
			},
			"profile filefield": {
				change: this.onFileFieldChange
			}
		});

		if (!Ext.getStore('groups')) {
            Ext.create('Packt.store.security.Groups');
        } 
	},

	onRender: function(component, options) {         
		component.getStore().load({
            params: {
                group: null
            }
        }); 
	},

    onHabilitarBotoes: function(model, selected, options) {
        var grid = this.getUsers();
        var btnEdit = grid.down('#edit');
        var btnDelete = grid.down('#delete');
        if(selected[0]) {
            if(btnDelete.isDisabled()) {
                btnDelete.setDisabled(false);
            }
            if(btnEdit.isDisabled()) {
                btnEdit.setDisabled(false);
            }
        } else {
            if(!btnDelete.isDisabled()) {
                btnDelete.setDisabled(true);
            }
            if(!btnEdit.isDisabled()) {
                btnEdit.setDisabled(true);
            }
        }
    },

	onButtonClickAdd: function(button, e, options) {
		var win = Ext.create('Packt.view.security.Profile');
		win.setTitle(translations.windowTitleAddUser);
		win.show();
	},

	onButtonClickEdit: function(button, e, options) {

        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection();

        if(record[0]){

            var editWindow = this.getProfile();//Ext.create('Packt.view.security.Profile');

            editWindow.down('form').loadRecord(record[0]);

            if(record[0].get('picture')) {
            	var img = editWindow.down('image');
            	img.setSrc('resources/profileImages/' + record[0].get('picture'));
            }
      
            editWindow.setTitle(record[0].get('name'));            
            editWindow.setHeight(editWindow.height + 20); //AUMENTANDO O TAMANHO DA JANELA PRA COMPORTAR O CAMPO DO STATUS
            editWindow.query('combobox[itemId="status"]')[0].setVisible(true); //TORNANDO VISÍVEL O CAMPO STATUS
            editWindow.show();
        }        
    },

    onButtonClickSave: function(button, e, options) {
        
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getUsersList().getStore(),
        grid = this.getUsersList(),
        gridLog = this.getUsersLogList(),
        record = formPanel.getForm(),
        values = formPanel.getValues(),

        //AJUSTE TÉCNICO!!!
        selectedRow = grid.getSelectionModel().getSelection()[0];
        var row = store.indexOf(selectedRow);
        if(row == 0) {
            grid.getSelectionModel().deselectAll();
        }
        grid.getSelectionModel().select(row-1);

        if (formPanel.getForm().isValid()) {

            formPanel.getForm().submit({
                clientValidation: true,
                url: 'php/security/saveUser.php',
                success: function(form, action) {

                    var result = action.result;

                    if (result.success) {

                        if(result.cadastro) {                            
                            Packt.util.Log.montaLogUserINSERT(record, values, gridLog);

                        } else {                            
                            Packt.util.Log.montaLogUserUPDATE(record, values, gridLog, result.image);
                        }

                        Packt.util.Alert.msg(translations.msgUserSave1, translations.msgUserSave2);
                        store.load();
                        win.close();
                      
                    } else {
                        Packt.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                   }
                }
            });
        } 
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore(),
        gridlog = this.getUsersLogList();

        if (store.getCount() >= 2 && record[0]){

            Ext.Msg.show({
                 title: translations.msgTitleDelete,
                 msg: translations.msgQuestionDelete,
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        Ext.Ajax.request({
                            url: 'php/security/deleteUser.php',
                            params: {
                                id: record[0].get('id'),
                                picture: record[0].get('picture')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = Packt.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {
                                    if (result.deleted) {
                                        Packt.util.Alert.msg(translations.msgUserSave1, translations.msgUserDeleted);
                                        store.load();                                    
                                        Packt.util.Log.montaLogUserDELETE(record, gridlog);

                                    } else {
                                        Ext.Msg.show({
                                            title: 'Operacação Negada!',
                                            msg: 'Você está tentando se auto deletar enquanto sua sessão ainda está ativa. E isso não é permitido.',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.WARNING
                                        });
                                    }
                                  
                                } else {
                                    Packt.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {

                                Packt.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                 }
            });
        } else if (store.getCount() == 1) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    onFileFieldChange: function(filefield, value, options) {
    	var file = filefield.fileInputEl.dom.files[0];

    	var picture = this.getUserPicture();

    	if(typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
    		var reader = new FileReader();
    		reader.onload = function(e){
    			picture.setSrc(e.target.result);
    		};
    		reader.readAsDataURL(file);

    	} else if (!(/image/i).test(file.type)) {
    		Ext.Msg.alert('Warning', 'You can only upload image files!');
    		filefield.reset();
    	}
    }
});