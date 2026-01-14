module.exports = {
  apps: [
    {
      name: 'antoinemcx.fr',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NITRO_HOST: '127.0.0.1',
        NITRO_PORT: 9000
      }
    }
  ]
}
