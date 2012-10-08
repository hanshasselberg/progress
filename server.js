var formidable = require('formidable'),
    fs         = require('fs'),
    http       = require('http'),
    uploads    = require('./uploads');


var port = process.env.PORT || 8080;
var index = "";
fs.readFile("./index.html", 'utf8', function(err, data) {
  index = data;
});
var show = "<html><body>Path: $PATH$ <br/>Filename: $NAME$</body></html>"

console.log("Starting server at port " + port);

http.createServer(function(req, res) {
  action = req.url.split('?')[0] || "";
  id = req.url.split('id=')[1] || "";
  upload = uploads.find_or_create(id);

  console.log(req.method + ": " + req.url);

  if (action == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(index.replace(/\$ID\$/g, upload.id));
  } else if (action == '/progress') {
    upload.response = res;
    upload.setup_progress();
  } else if (action == "/file") {
    if(upload.file_path !== '') {
      res.setHeader('Content-disposition', 'attachment; filename=' + upload.file_name);
      res.setHeader('Content-Length', upload.total);
      var filestream = fs.createReadStream(upload.file_path);
      filestream.on('data', function(chunk) {
        res.write(chunk);
      });
      filestream.on('end', function() {
        res.end();
      });
    } else {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('404 not found');
    }
  } else if (action == '/file_upload') {
    upload.total = req.headers['content-length'];
    new formidable.IncomingForm()
      .on('progress', function(rec, exp) {
        upload.received = rec;
        upload.render_progress();
      })
      .parse(req, function(err, fields, files) {
        upload.file_name = files.file.name;
        upload.file_path = files.file.path;
        upload.teardown_progress();
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('received upload');
      });
  } else if (action == "/text_form") {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(show.replace(/\$PATH\$/, upload.file_path).replace(/\$NAME\$/, upload.file_name));
  };
}).listen(port);
