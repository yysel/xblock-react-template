import {Provider} from 'rc-xblock'
import Fetch from 'rc-xblock/fetch'

export default class appProvider extends Provider {

  /**
   * 应用启动前,在这里进行初始化操作
   */
  boot() {
    // console.log(this.app)
  }

  /**
   * 应用启动后，可以在这进行组件注册等
   */
  register() {

    // console.log(this.app)
  }
}