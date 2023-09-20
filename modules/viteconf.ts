import { addBuildPlugin, addComponent, createResolver, defineNuxtModule, useNuxt } from 'nuxt/kit'
import { createUnplugin } from 'unplugin'

export default defineNuxtModule({
  meta: {
    name: 'viteconf',
    configKey: 'viteconf'
  },
  defaults: {
    enabled: false
  },
  setup(options) {
    if (!options.enabled) return

    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)
    addComponent({
      name: 'NuxtWelcome',
      filePath: resolver.resolve('./runtime/NuxtWelcome.vue'),
      priority: 20
    })
    addBuildPlugin(createUnplugin(() => ({
      name: 'super-advanced-plugin',
      transform(code) {
        return code.replace('Welcome to ViteConf', 'Welcome to ViteConf 2023')
      }
    })))
  },
})
