Keyed List
==========

An enumerable list where each element is also accessible via a key provided by
the user.

    var dates = new KeyedList({
        birth: 1533,
        coronation: 1558
    });
    
    dates.keys(); // -> ['birth', 'coronation']
    dates.values(); // -> [1533, 1558]
    
    dates.store('death', 1603);
    
    dates.getNext('coronation'); // -> 1603
    dates.getNextKey('coronation'); // -> 'death'
    
    dates.getPrevious('coronation'); // -> 1533
    dates.getPreviousKey('coronation'); // -> 'birth'
    
    dates.remove('coronation');
    
    dates.keys(); // -> ['birth', 'death']
    dates.values(); // -> [1533, 1603]

This library is built with James Coglan's [JS.Class] and its API borrows a lot
from [JS.OrderedHash]. It's released under the BSD license; please see the
`LICENSE` file for details.

[JS.Class]: http://jsclass.jcoglan.com/
[JS.OrderedHash]: http://jsclass.jcoglan.com/hash.html
