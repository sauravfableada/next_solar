const https = require('https');

https.get('https://www.waaree.com/', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const idx = html.indexOf('Solar Module Manufacturing');
    if (idx !== -1) {
      console.log('Snippet around Solar Module:');
      console.log(html.slice(Math.max(0, idx - 500), idx + 1000));
    } else {
      console.log('Not found');
    }
  });
});

