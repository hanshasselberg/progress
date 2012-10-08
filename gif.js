var fs = require('fs');

function Gif() {
  this.path = '';
  this.raw = "";
  this.frames = [];
  this.prepare = function() {
    _this = this;
    fs.readFile(this.path, function(err, data) {
      var seperator = "\x00,"
      _this.raw = data.toString('binary');
      _this.frames = data.toString('binary').split(seperator);
      for(i=0; i<_this.frames.length-1; i++){
        _this.frames[i] = _this.frames[i].replace(/;$/, '') + seperator
      }
    });
  };
}

module.exports = new Gif();
