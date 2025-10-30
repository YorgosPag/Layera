const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Διαβάζω το HTML αρχείο
const htmlPath = path.join(__dirname, 'mock-layera-id.html');

const server = http.createServer((req, res) => {
  console.log(`📡 Request: ${req.method} ${req.url}`);

  // CORS headers για cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        console.error('❌ Error reading HTML file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'Layera ID Mock',
      port: PORT,
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Layera ID Mock Server started!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🎯 Ready to receive navigation from GeoAlert`);
  console.log(`⚠️  This is a MOCK service - Real Layera ID needs Node.js upgrade`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log(`🔍 Check what's running on port ${PORT}:`);
    console.log(`   netstat -an | findstr ":${PORT}"`);
  } else {
    console.error('❌ Server error:', err);
  }
});