const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('text.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Error while opening file", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            zlib.gzip(data, (err, compressedData) => {
                if (err) {
                    console.error("Error compressing data: ", err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, { 
                    'Content-Type': 'text/plain',
                    'Content-Encoding': 'gzip'
                });
                res.end(compressedData);
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(5000, () => {
    console.log('Server is listening on port 5000');
});
