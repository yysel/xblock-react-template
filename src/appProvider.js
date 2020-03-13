import { Provider } from 'rc-xblock'
import Fetch from 'rc-xblock/fetch'

export default class appProvider extends Provider {

  boot () {
    Fetch.headers = {
      company: 'eryun'
    }

  }

  register () {

    // console.log(this.app)
  }
}