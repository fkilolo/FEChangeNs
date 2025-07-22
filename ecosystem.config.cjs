module.exports = {
    apps: [
      {
        name: `admin_ticket_domain_okVip`,
        script: "serve",
        env: {
          PM2_SERVE_PATH: "./dist",
          PM2_SERVE_PORT: 3000,
          PM2_SERVE_SPA: "true",
          NODE_ENV: 'production',
        },
      },
    ],
  };
  