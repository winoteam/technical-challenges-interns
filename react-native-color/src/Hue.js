/* @flow */

import React from 'react'
import { View, StyleSheet } from 'react-native'

import Draggable from './Draggable'

const DRAGGABLE_SIZE = 32

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  area: {
    position: 'absolute',
  },
  draggable: {
    marginTop: 4,
  },
})

type Props = {
  width: number,
  height: number,
}

type State = {
  minX: number,
  maxX: number,
}

export default class Hue extends React.Component<Props, State> {
  static defaultProps = {
    width: 350,
    height: 40,
  }

  constructor(props) {
    super(props)
    const { width } = props
    const minX = -DRAGGABLE_SIZE / 2
    const maxX = width - DRAGGABLE_SIZE / 2
    this.state = { minX, maxX }
  }

  onChange = () => {
    // ...
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { width, height } = this.props
    const { minX, maxX } = this.state
    return (
      <View style={[styles.container, { width, height }]}>
        <Draggable
          onChange={this.onChange}
          maxY={0}
          maxX={maxX}
          defaultX={minX}
          style={styles.draggable}
        />
      </View>
    )
  }
}
