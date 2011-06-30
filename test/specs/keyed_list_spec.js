JS.ENV.KeyedListSpec = JS.Test.describe('KeyedList', function() { with (this) {
    before(function() {
        this.KeyedList = JS.ENV.KeyedList;
    });
    
    it('should add key/value pairs provided to the constructor in declaration order', function() { with(this) {
        var list   = new KeyedList({foo: 100, bar: 200, baz: 300}),
            values = [100, 200, 300];
        
        list.forEach(function(value, i) {
            assertEqual(values[i], value);
        });
        
        assertEqual(values, list.values());
    }});
    
    it('should only add properties of the object passed to the constructor, not those of the object\'s prototype', function() { with(this) {
        var objA = {foo: 100, bar: 200, baz: 300},
            objB = {},
            xs, ys;
        
        xs = new KeyedList(objA);
        
        assertEqual(3, xs.length);
        
        objB.foo = 19;
        objB.bar = 74;
        objB.constructor.prototype.bar = 52;
        
        ys = new KeyedList(objB);
        
        assertEqual(2, ys.length);
    }});
    
    it('should iterate over values in insertion order', function() { with(this) {
        var list   = new KeyedList({foo: 100, bar: 200, baz: 300}),
            values = [100, 300, 400, 500];
        
        list.store('wibble', 400);
        list.remove('bar');
        list.store('wobble', 500);
        
        list.forEach(function(value, i) {
            assertEqual(values[i], value);
        });
    }});
    
    it('should return an element where one is present for a given key, and undefined if not', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        assertEqual(200, list.get('bar'));
        assertEqual(100, list.get('foo'));
        assertEqual(300, list.get('baz'));
        assertKindOf('undefined', list.get('quux'));
    }});
    
    it('should return the element inserted longest ago when shift is called', function() { with(this) {
        var foo  = {name: 'oof'},
            bar  = {name: 'rab'},
            baz  = {name: 'zab'},
            list = new KeyedList({foo: foo, bar: bar, baz: baz});
        
        assertEqual(foo, list.shift());
        assertEqual(bar, list.shift());
        assertEqual(baz, list.shift());
        assertNull(list.shift());
    }});
    
    it('should add new elements to the beginning of the list when unshift is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        list.unshift('quux', 0);
        
        assertEqual([0, 100, 200, 300], list.values());
        assertEqual([99], (new KeyedList()).unshift('wibble', 99).values());
    }});
    
    it('should return the most recently inserted element when pop is called', function() { with(this) {
        var foo  = {name: 'oof'},
            bar  = {name: 'rab'},
            baz  = {name: 'zab'},
            list = new KeyedList({foo: foo, bar: bar, baz: baz});
        
        assertEqual(baz, list.pop());
        assertEqual(bar, list.pop());
        assertEqual(foo, list.pop());
        assertNull(list.pop());
    }});
    
    it('should add new elements to the end of the list when push is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        list.push('quux', 400);
        
        assertEqual([100, 200, 300, 400], list.values());
        assertEqual([99], (new KeyedList()).push('wibble', 99).values());
    }});
    
    it('should return removed elements', function() { with(this) {
        var list = new KeyedList(),
            key  = 'mykey',
            elem = {};
        
        list.store(key, elem);
        
        assertEqual(elem, list.remove(key));
    }});
    
    it('should return null when attempting to remove with an unused key', function() { with(this) {
        var list = new KeyedList();
        
        assertNull(list.remove('nexistepas'));
    }});
    
    it('should not remove or reorder elements when attempting to remove with an unused key', function() { with(this) {
        var list   = new KeyedList({foo: 100, bar: 200, baz: 300}),
            values = list.values();
        
        list.remove('nexistepas');
        
        assertEqual(values, list.values());
    }});
    
    it('should not throw errors when there are no elements to remove', function() { with(this) {
        var list = new KeyedList();
        
        assertNothingThrown(function() {
            list.pop();
        });
        
        assertNothingThrown(function() {
            list.shift();
        });
        
        assertNothingThrown(function() {
            list.remove('foo');
            list.store('foo', {});
            list.remove('foo');
            list.remove('foo');
        });
    }});
    
    it('should return the next key when getNextKey is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        assertEqual('bar', list.getNextKey('foo'));
        assertEqual('baz', list.getNextKey('bar'));
        assertEqual('foo', list.getNextKey('baz'));
    }});
    
    it('should return the next element when getNext is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        assertEqual(200, list.getNext('foo'));
        assertEqual(300, list.getNext('bar'));
        assertEqual(100, list.getNext('baz'));
    }});
    
    it('should return the previous key when getPreviousKey is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        assertEqual('baz', list.getPreviousKey('foo'));
        assertEqual('foo', list.getPreviousKey('bar'));
        assertEqual('bar', list.getPreviousKey('baz'));
    }});
    
    it('should return the previous element when getPrevious is called', function() { with(this) {
        var list = new KeyedList({foo: 100, bar: 200, baz: 300});
        
        assertEqual(300, list.getPrevious('foo'));
        assertEqual(100, list.getPrevious('bar'));
        assertEqual(200, list.getPrevious('baz'));
    }});
    
    it('should return a list of keys in insertion order', function() { with(this) {
        var list = new KeyedList();
        
        list.store('foo', {name: 'oof'});
        list.store('bar', {name: 'rab'});
        list.store('baz', {name: 'zab'});
        
        assertEqual(['foo', 'bar', 'baz'], list.keys());
        assertEqual([], (new KeyedList()).keys());
    }});
    
    it('should return a list of values in insertion order', function() { with(this) {
        var list = new KeyedList(),
            foo  = {name: 'oof'},
            bar  = {name: 'rab'},
            baz  = {name: 'zab'};
        
        list.store('foo', foo);
        list.store('bar', bar);
        list.store('baz', baz);
        
        assertEqual([foo, bar, baz], list.values());
        assertEqual([], (new KeyedList()).values());
    }});
    
    it('should keep track of how many elements it contains', function() { with(this) {
        var list = new KeyedList();
        
        assertEqual(0, list.length);
        
        list.store('foo', {name: 'oof'});
        
        assertEqual(1, list.length);
        
        list.store('bar', {name: 'rab'});
        list.store('baz', {name: 'zab'});
        
        assertEqual(3, list.length);
        
        list.remove('bar');
        
        assertEqual(2, list.length);
        
        list.pop();
        
        assertEqual(1, list.length);
    }});
    
    it('should normalise keys where possible, and fail where not', function() { with(this) {
        var list       = new KeyedList(),
            stringable = {toString: function() { return 'Some string.'; }};
        
        list.store(stringable, 1001);
        
        assertEqual(1001, list.get(stringable));
        
        assertThrows(Error, function() {
            list.store(null, 1002);
        });
    }});
}});
