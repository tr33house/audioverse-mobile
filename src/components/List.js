import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, ActivityIndicator } from 'react-native'

const List = ({ renderItem, items, isFetching, onRefresh, onEndReached, selectItem, nextPageUrl }) => {

  if (!items.length) {
    return (
      <ActivityIndicator
        size="large"
        color="#03A9F4"
        style={{margin: 50}}
      />
    )
  }

  const handleEndReached = () => {
    console.log('end reached!!')
    nextPageUrl && typeof onEndReached === 'function' && onEndReached()
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshing={isFetching}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
    />
  )

}

List.propTypes = {
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
}

export default List
