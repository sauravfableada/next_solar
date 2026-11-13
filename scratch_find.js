const https = require('https');
const fs = require('fs');

https.get('https://www.waaree.com/', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const urls = body.match(/https?:\/\/[^\s"'<>]+\.(?:webp|png|jpg|gif|svg)/gi) || [];
    console.log('Total URLs found:', urls.length);
    const globe = urls.filter(u => /earth|globe|solar|home|banner|hero/i.test(u));
    console.log('Filtered URLs:', globe.slice(0, 15));
  });
});

