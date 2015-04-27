var prom_spawn = require('./index'),
    chai       = require('chai'),
    expect     = chai.expect;

chai.use(require('chai-as-promised'));

describe('prom_spawn', function() {
  it('should resolve as a promise', function() {
    expect(prom_spawn('ls')()).to.be.an.instanceof(Promise);
  });

  it('should reject on exit code != 0', function() {
    expect(prom_spawn('exit',1)()).to.eventually.be.rejected;
  });
  
  it('should be resolved on success', function() {
    expect(prom_spawn('exit',0)()).to.eventually.be.resolved;
  });

  it('should resolve with the stdout of the command', function(done) {
    var text = 'hello';
    prom_spawn('printf',text)().then(function(data) {
      expect(data).to.equal(text);
      done();
    }).catch(function(error) {
      console.error(error);
    });
  });
});
