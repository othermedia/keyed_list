KeyedList = new JS.Class('KeyedList', {
    include: JS.Enumerable,
    
    initialize: function(pairs) {
        var key;
        
        this._values = {};
        this._keys   = [];
        this.length  = this._keys.length;
        
        if (typeof pairs != 'object') return;
        
        for (key in pairs) {
            this.store(key, pairs[key]);
        }
    },
    
    store: function(key, value) {
        key = this.normaliseKey(key);
        this._keys.push(key);
        this._values[key] = value;
        this.length = this._keys.length;
        
        return this;
    },
    
    remove: function(key) {
            key = this.normaliseKey(key);
        var elem  = this._values[key],
            index = this._keys.indexOf(key);
        
        this._keys.splice(index, 1);
        this.length = this._keys.length;
        
        delete this._keys[key];
        return elem;
    },
    
    shift: function() {
        if (this._keys.length < 1) return null;
        
        var key  = this._keys.shift(),
            elem = this._values[key];
        
        this.length = this._keys.length;
        delete this._values[key];
        return elem;
    },
    
    unshift: function(key, value) {
        key = this.normaliseKey(key);
        this._keys.unshift(key);
        
        this._values[key] = value;
        this.length = this._keys.length;
        
        return this;
    },
    
    pop: function() {
        if (this._keys.length < 1) return null;
        
        var key  = this._keys.pop(),
            elem = this._values[key];
        
        this.length = this._keys.length;
        delete this._values[key];
        return elem;
    },
    
    push: function(key, value) {
        return this.store(key, value);
    },
    
    get: function(key) {
        key = this.normaliseKey(key);
        return this._values[key];
    },
    
    getNextKey: function(key) {
            key       = this.normaliseKey(key);
        var index     = this._keys.indexOf(key),
            nextIndex = (index + 1) % this.length;
        
        return this._keys[nextIndex];
    },
    
    getNext: function(key) {
        return this._values[this.getNextKey(key)];
    },
    
    getPreviousKey: function(key) {
            key       = this.normaliseKey(key);
        var index     = this._keys.indexOf(key),
            prevIndex = index - 1;
        
        if (prevIndex < 0) {
            prevIndex = (prevIndex + this.length) % this.length;
        }
        
        return this._keys[prevIndex];
    },
    
    getPrevious: function(key) {
        return this._values[this.getPreviousKey(key)];
    },
    
    forEach: function(block, scope) {
        if (!block) return this.enumFor('forEach');
        
        var len = this.length, i, k;
        
        for (i = 0; i < len; i++) {
            k = this._keys[i];
            block.call(scope || null, this._values[k], i);
        }
        
        return this;
    },
    
    keys: function() {
        return this._keys.concat();
    },
    
    values: function() {
        var len    = this._keys.length,
            values = new Array(len),
            i;
        
        for (i = 0; i < len; i++) {
            values[i] = this._values[this._keys[i]];
        }
        
        return values;
    },
    
    normaliseKey: function(key) {
        if (typeof key == 'string') {
            return key;
        } else if (typeof key.toString == 'function') {
            return key.toString();
        } else {
            throw new Error('Keys must be strings or objects with a #toString method');
        }
    }
});
