import { createStore } from 'redux' // 引入 createStore方法
import reducer from './reducer' // 引入reducer
const store = createStore(
  reducer,
) // 创建数据存储仓库
export default store