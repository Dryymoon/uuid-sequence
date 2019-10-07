# uuid #

UUIDS generator for databases.

It’s good to generate GUIDs **for databases**, since variability increases from start to end of line, unlike other wyd generators in which variability decreases from start to end of line.

For example this lib will generate:
* 4c32758b-96ff-614a-b969-9b4a4a731347
* 4c32758b-96ff-fe7a-b969-282491172654
* 4c32758b-96ff-bca2-b977-c2bc3ab41fd4

And other libs in most cases will generates: 
* b097b7e3-d0fa-4c87-8e7e-1cbcadc25705
* 64827630-3868-4252-afb8-aea4e0eb96ef
* 1ee972b5-5812-4091-9d47-7b852f21d0bf

----

Features:

* Good for database UUID gengeration. 
* UUID sequence variability increases from start to end.
* Uses cryptographically-strong random number APIs (when available)
* Works in Node and Browser

## Quickstart - CommonJS (Recommended)

```shell
npm install uuid-sequential
```

Then generate your uuid...

```javascript
const uuid = require('uuid-sequential');

uuid(); // ⇨ '4c32758b-96ff-614a-b969-9b4a4a731347'
uuid(); // ⇨ '4c32758b-96ff-fe7a-b969-282491172654'
uuid(); // ⇨ '4c32758b-96ff-bca2-b977-c2bc3ab41fd4'
```

----