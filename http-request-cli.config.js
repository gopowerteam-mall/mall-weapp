module.exports = {
    name: 'default',
    gateway: 'https://mall-service.gopowerteam.cn',
    swagger: 'weapp/api-docs',
    model: true,
    modelDir: {
        alias: '@/http/model', // 控制器目录名别
        path: './src/http/model' // 控制器目录路径
    },
    controllerDir: {
        alias: '@/http/controllers', // 控制器目录名别
        path: './src/http/controllers' // 控制器目录路径
    },
    serviceDir: {
        alias: '@/http/services', // 服务目录名别
        path: './src/http/services' // 服务目录名别
    },
    controllerResolver: (_, currentTag) => {
        const [tag] = currentTag || []
        return tag.replace(/^\S/, s => s.toUpperCase())
    }
}
