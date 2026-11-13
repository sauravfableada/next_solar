const https = require('https');
const fs = require('fs');

const icons = [
  { url: 'https://www.waaree.com/upload/media/solar_cell_icon_1748325648.svg', file: './public/images/solar_cell.svg' },
  { url: 'https://www.waaree.com/upload/media/solar_module_icon_1748325637.svg', file: './public/images/solar_module.svg' },
  { url: 'https://www.waaree.com/upload/media/country_icon_1748325606.svg', file: './public/images/country_icon.svg' },
  { url: 'https://www.waaree.com/upload/media/tier_01_1782377439.png', file: './public/images/tier_1.png' },
];

icons.forEach(({ url, file }) => {
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const f = fs.createWriteStream(file);
      res.pipe(f);
      f.on('finish', () => console.log('Saved', file, fs.statSync(file).size));
    } else {
      console.log('Failed', url, res.statusCode);
    }
  });
});

