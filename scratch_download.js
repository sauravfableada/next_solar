const https = require('https');
const fs = require('fs');

const fileUrl = 'https://www.waaree.com/upload/media/earth_solar_1748325218.webp';
const dest = './public/images/waaree-earth.webp';

https.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Status:', res.statusCode);
  if (res.statusCode === 200) {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded waaree earth:', fs.statSync(dest).size);
    });
  } else {
    console.log('Failed:', res.statusCode);
  }
});

