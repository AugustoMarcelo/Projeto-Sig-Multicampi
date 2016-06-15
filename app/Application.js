function loadLocale() {
	var lang = localStorage ? (localStorage.getItem('user-lang') || 'pt_BR') : 'pt_BR',
	extjsFile = Ext.util.Format.format("ext/packages/ext-locale/build/ext-locale-{0}.js", lang);
	Ext.Loader.loadScript({url: extjsFile});
}

loadLocale();

Ext.application({
    name: 'Packt',

    //extend: 'Packt.Application',
    extend: 'Ext.app.Application',
    
    autoCreateViewport: false
});
