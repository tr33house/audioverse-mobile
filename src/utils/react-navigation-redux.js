import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'

import { getNav } from '../reducers/selectors'

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => getNav(state)
)

const addListener = createReduxBoundAddListener("root")

export {
  middleware,
  addListener
}
