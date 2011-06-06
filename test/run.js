var CWD = (typeof CWD === 'undefined') ? '.' : CWD;

JS.Packages(function() {
    this.autoload(/^(.*)Spec$/, {
        from: CWD + '/test/specs',
        require: '$1'
    });
    
    this.file(CWD + '/src/keyed_list.js')
        .provides('KeyedList')
        .requires('JS.Class', 'JS.Enumerable');
});

JS.require('JS.Test', function() {
    JS.require('KeyedListSpec', JS.Test.method('autorun'));
});
