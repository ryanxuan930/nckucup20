module.exports = {
  apps: [
    {
      name: 'nclucup20',
      port: 3000,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}