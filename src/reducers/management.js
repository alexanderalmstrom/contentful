import { makeReducer } from './util'

export const management = makeReducer(
  function(action) {
    switch (action.type) {
      case 'LOADED_MANAGEMENT':
        return { authState: action.authState }
    }
  },
  { authState: 'loading' }
)
