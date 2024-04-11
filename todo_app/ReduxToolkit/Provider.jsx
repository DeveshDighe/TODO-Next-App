'use client'

import {Provider} from 'react-redux'
import { store } from './Store/store'


const Providers = ({children}) => {
  return(
    <Provider store={store}>{children}</Provider>
  )
}

export default Providers