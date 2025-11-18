const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {
        '^/api/contact': '/portfolio/sendEmail.php', // Ajusta la ruta según la estructura de tu servidor
      },
    })
  );
};
