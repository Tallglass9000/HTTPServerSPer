var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

//some of this code is from https://gist.github.com/DDunc/3a6eba28879050a7383f
describe('index.js', function() {
  describe('GET /data/text.json', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .get('/text.json')
        .end(function(err, res) {
          error = err;
          response = res;
          done();
        });
    });

    it('should log the data in the json file', function() {
      expect(response.text).to.eql('{\n  "name": "Firstname, Lastname",\n  "phone": "555-555-5555",\n  "email": "email@email.com",\n  "url": "http://url.com"\n}');
    });
  });

  describe('POST /notes', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .post('/notes')
        .send('{"noteBody":"hello there, amazing world"}')
        .end(function(err, res) {
          error = err;
          response = res;
          done();
        });
    });

    it('should write to a new file', function () {
      expect(response.text).to.eql("hello there, amazing world");
    });
  });

  describe('POST /notes', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .post('/notes')
        .send('{"noteBody":"hello again!"}')
        .end(function(err, res) {
          error = err;
          response = res;
          done();
        });
    });

    it('should write to a new file', function () {
      expect(response.text).to.eql("hello again!");
    });
  });
});