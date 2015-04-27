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
});
