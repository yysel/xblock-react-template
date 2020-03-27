document.getElementById('nio-loading').style.display = 'none'
import XBlock from 'rc-xblock'
import appProvider from './appProvider'
import 'antd/dist/antd.less'
import 'rc-xblock/styles/index.less'

//注册服务者
XBlock.provider(appProvider)

//启动应用
XBlock.run('#root')

