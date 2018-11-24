import { makeReducer } from './util'

export const contentful = makeReducer(
  function(action) {
    switch (action.type) {
      case 'LOADED_CONTENTFUL':
        return { authState: action.authState }
    }
  },
  { authState: 'loading' }
)
