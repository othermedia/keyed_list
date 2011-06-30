Keyed List
==========

An enumerable list where each element is also accessible via a key provided by
the user.

This library is built with James Coglan's [JS.Class] and its API borrows a lot
from [JS.OrderedHash]. It's released under the BSD license; please see the
`LICENSE` file for details.

[JS.Class]:       http://jsclass.jcoglan.com
[JS.OrderedHash]: http://jsclass.jcoglan.com/hash.html


Installation
------------

This library is available from [npm] and is considered portable: it works both
on [Node] and all modern web browsers. Its only dependency is [JS.Class].

    npm install -g keyed_list

You can build a minified version from source with [Jake]; this requires [Ruby]
and [Rubygems].

[npm]:      http://npmjs.org/
[Node]:     http://nodejs.org/
[Jake]:     https://github.com/jcoglan/jake
[Ruby]:     http://ruby-lang.org/
[Rubygems]: http://rubygems.org/


Usage
-----

The `keyed_list` library exposes the `KeyedList` class. When creating a new
instance of this class, you can pass in a hash of key-value pairs which will be
added to the list.

    var dates = new KeyedList({
        birth: 1533,
        coronation: 1558
    });
    
    dates.length; // -> 2

Both keys and values can be extracted, in order, as arrays with the `keys` and
`values` methods.

    dates.keys(); // -> ['birth', 'coronation']
    dates.values(); // -> [1533, 1558]

To add a new element to the list, use the `store` method, passing in a string
key as the first argument and the value as the second.

    dates.store('death', 1603);

To retrieve an existing object via its key, use the `get` method. If there is
no value associated with a key, the method will return `undefined`.

    dates.get('birth'); // -> 1533
    dates.get('wedding'); // -> undefined

Deletion by key is also supported via the `remove` method, which returns the
removed element, or `null` if no element is associated with that key.

    dates.remove('coronation'); // -> 1558
    dates.remove('wedding'); // -> null

The four 'stack' methods from JavaScript's `Array` prototype are also supported
and do the expected things:

* `pop` removes the last element of the list and returns that element;
* `push` adds an element to the end of the list and returns the list;
* `shift` removes the first element of the list and returns that element;
* `unshift` adds an element to the beginning of the list and returns the list.

Both keys and values can be extracted as arrays.

    dates.keys(); // -> ['birth', 'death']
    dates.values(); // -> [1533, 1603]

Additionally, the `KeyedList` class has a `forEach` method which can iterate
over its values. This allows it to mix in the [JS.Enumerable] module, giving it
a rich set of methods for dealing with collections.

As well as these, there are four methods for traversing the list: `getNext`,
`getPrevious`, `getNextKey` and `getPreviousKey`. They all accept a key and
return either the next or previous object in the list to that corresponding
with the provided key, or their associated key.

    dates.getNext('coronation'); // -> 1603
    dates.getNextKey('coronation'); // -> 'death'
    
    dates.getPrevious('coronation'); // -> 1533
    dates.getPreviousKey('coronation'); // -> 'birth'

[JS.Enumerable]: http://jsclass.jcoglan.com/enumerable.html


Testing
-------

The test suite is written with the [JS.Test] testing framework and runs on most
JavaScript platforms, including [Node] and all modern web browsers.

To run the test suite from the command line, run the following command
(replacing `node` with [Rhino], [V8] etc. where relevant).

    node test/console.js

To run the test suite in a browser, open the `test/browser.html` file in a web
browser.

[JS.Test]: http://jsclass.jcoglan.com/testing.html
[Rhino]:   http://www.mozilla.org/rhino/
[V8]:      http://code.google.com/p/v8/


Deployment
----------

The library includes a `jake.yml` file for use with the Jake build tool, as
explained above. This also means that it is easily deployed with [Helium], a
Git-backed JavaScript package server. It should also fit into any other build
or deploy system based on [JS.Packages].

[Helium]:      https://github.com/othermedia/helium
[JS.Packages]: http://jsclass.jcoglan.com/packages.html
