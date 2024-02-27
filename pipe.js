const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
    const filePath = 'text.txt';
    const readStream = fs.createReadStream(filePath);

    readStream.on('error', err => {
        console.error("Error: ", err);
        res.statusCode = 500;
        res.end('500 Internal Server Error');
    });

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
    });

    const gzip = zlib.createGzip();
    readStream.pipe(gzip).pipe(res);
});

const port = 4000;
server.listen(port, () => {
    console.log('Server listening on port', port);
});
