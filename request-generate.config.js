/**
 * @type {import('@gopowerteam/request-generate').GenerateOptions}
 */
module.exports = {
  gateway: 'https://mall-service.gopowerteam.cn',
  openapi: '/client/api-docs',
  output: './src/http',
  exportModels: true,
  exportServices: {
    responseType: 'promise',
    excludeQueryParams: ['page', 'size', 'order'],
  },
}
