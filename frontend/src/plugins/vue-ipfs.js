import IPFS from 'ipfs'
import Room from 'ipfs-pubsub-room'
// import Mixin from './vue-ipfs-mixin'

const plugin = {
  async install(Vue) {
    Vue.prototype.$ipfs = await IPFS.create({
    	repo: 'ipfs/orszagvaros/' + Math.random(),
  			EXPERIMENTAL: {
    			pubsub: true
  			},
		  config: {
		    Addresses: {
		      Swarm: [
		        '/dns4/star-signal.andruida.hu/tcp/443/wss/p2p-webrtc-star/'
		      ]
		    }
		  }
		}
	)
 //    setInterval(async function() {
 //    	console.log(await Vue.prototype.$ipfs.swarm.peers())
	// }, 1000)
	var id = await Vue.prototype.$ipfs.id()
	Vue.prototype.$ipfsCID = id.id
    Vue.prototype.$vueRoom = Room
    // Vue.mixin(Mixin)
  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin