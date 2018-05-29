/**
 * Creates a reducer to manage pagination, given the actions types to handle,
 * @param {array} types 
 */
function paginate({ types }) {
  if (!Array.isArray(types) || types.length !== 4) {
    throw new Error('Expected types to be an array of four elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be string')
  }

  const [ requestType, successType, refreshType, failureType ] = types

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    data: []
  }, action) {

    switch (action.type) {
      case requestType:
        console.log('action request', action, state)
        return {
          ...state,
          isFetching: true
        }
      case successType:
        console.log('action success', action, state)
        return {
          ...state,
          isFetching: false,
          data: state.data.concat(action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        }
      case refreshType:
        console.log('action refresh', action, state)
        return {
          ...state,
          isFetching: false,
          data: action.response.result,
          nextPageUrl: action.response.nextPageUrl,
          pageCount: typeof action.response.nextPageUrl !== 'undefined' ? state.pageCount + 1 : 0
        }
      case failureType:
        console.log('action failure', action, state)
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return updatePagination
}

export default paginate
