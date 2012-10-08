var gif = require('./gif');

gif.path = "./progress.gif"
gif.prepare();

function Upload(id) {
  this.id = id;
  this.total = 0;
  this.response = null;
  this.received = 0;
  this.file_name = '';
  this.file_path = '';
  this.old_progress = 0;
  this.render_progress = function(){
    if(this.progress() > this.old_progress){
      console.log(this.received + "/" + this.total);
      console.log("render: " + this.progress());
      var offset = 7;
      var index = this.progress() + offset;
      this.response.write(gif.frames[index], 'binary');
      this.old_progress = this.progress();
    }
  };
  this.progress = function(){
    var result = 0
    if(this.received != 0){
      result = Math.round((this.received/this.total)*100);
    }
    return result
  };
  this.setup_progress = function() {
    this.response.writeHead(200, {'content-type': 'image/gif'});
    for(i=0; i<2; i++){
      this.response.write(gif.frames[i], 'binary');
    }
  };
  this.teardown_progress = function() {
    // this.response.end()
  };
}

function UploadsCollection() {
  this.entries = [];
  this.push = function(upload) {
    this.entries.push(upload);
  };
  this.find_or_create = function(id) {
    var id = parseInt(id);
    var upload = this.entries[id];
    if(upload === undefined){
      upload = new Upload(this.entries.length);
      this.entries.push(upload);
    }
    return upload;
  };
  this.clear = function() {
    this.entries = [];
  };
}

module.exports = new UploadsCollection();
