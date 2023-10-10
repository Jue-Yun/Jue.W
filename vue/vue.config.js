const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '你的标题'
        return args
      })
  }
})

// module.exports = {
//   chainWebpack: config => {
//     config
//       .plugin('html')
//       .tap(args => {
//         args[0].title = '你的标题'
//         return args
//       })
//   }
// }
