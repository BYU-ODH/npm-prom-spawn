# Alternative solutions
* https://github.com/bitsofinfo/stateful-process-command-proxy
* https://gist.github.com/millermedeiros/4724047

# Examples

```javascript
// basic usage
var p = require('prom-spawn');

// note that p() returns a function that returns a promise
p('rm', '-rf', 'tmpfolder')().then(function() {
  console.log('Success!');
});
```

```javascript
// chaining commands
var p = require('prom-spawn');
p('createdb', 'mydb', '-T', 'template_db')()
  .then(p('psql', 'mydb', '-c', 'DELETE FROM mytable WHERE 1=1'))
  .then(('sed','-i','s/good/such wow/g','doge.txt'));
```
