import seedrandom from 'seedrandom'
// import Mixin from './vue-ipfs-mixin'

const plugin = {
  async install(Vue) {
    Vue.prototype.$rng = seedrandom
  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin