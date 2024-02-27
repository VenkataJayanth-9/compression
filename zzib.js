const zlib = require('zlib');
const input = 'Hello world';

zlib.gzip(input, (err, compressedData) => {
    if(err){
        console.error('Error compressing data: ', err);
        return;
    }
    console.log("Conpressed Data: ", compressedData.toString());
    zlib.gunzip(compressedData, (err, compressedData) => {
        if(err){
            console.error('Error gunzipping data: ', err);
            return;
        }
        console.log("Uncompressed data: ",compressedData.toString());
    })
});
