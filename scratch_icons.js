const https = require('https');
https.get('https://www.waaree.com/', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const urls = body.match(/https?:\/\/[^\s"'<>]+\.(?:svg|png|webp)/gi) || [];
    console.log('URLs:', urls.filter(u => /stat|tier|icon|module|cell|country|gw/i.test(u)).slice(0, 15));
  });
});

