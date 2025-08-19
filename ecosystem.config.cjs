module.exports = {
  apps: [
    {
      name: 'antoinemcx.fr',
      port: '9000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
