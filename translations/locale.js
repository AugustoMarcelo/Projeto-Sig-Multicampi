var lang = localStorage ? (localStorage.getItem('user-lang') || 'pt_BR') : 'pt_BR';
var file = 'translations/' + lang + '.js';
var extjsFile = '../Projeto-Sig-Multicampi/ext/locale/ext-lang-' + lang + '.js';
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');
document.write('<script type="text/javascript" src="' + file + '"></script>');
//arquivo de codificação