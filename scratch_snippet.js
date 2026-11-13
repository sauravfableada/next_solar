const https = require('https');
const fs = require('fs');

https.get('https://www.waaree.com/', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    // Look for svgs or image tags around 25.8 GW
    const idx = html.indexOf('25.8');
    if (idx !== -1) {
      console.log('Snippet around 25.8 GW:');
      console.log(html.slice(Math.max(0, idx - 400), idx + 800));
    } else {
      console.log('25.8 not in raw html, checking scripts or assets');
    }
  });
});

