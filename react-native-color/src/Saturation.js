/* @flow */

import React from 'react'
import { StyleSheet, View } from 'react-native'

import Draggable from './Draggable'

const DRAGGABLE_SIZE = 32

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
})

type Props = {
  width: number,
  height: number,
}

type State = {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
}

export default class Saturation extends React.Component<Props, State> {
  static defaultProps = {
    width: 350,
    height: 280,
  }

  constructor(props: Props) {
    super(props)
    const { width, height } = props
    this.state = {
      minX: -DRAGGABLE_SIZE / 2,
      maxX: width - DRAGGABLE_SIZE / 2,
      minY: -DRAGGABLE_SIZE / 2,
      maxY: height - DRAGGABLE_SIZE / 2,
    }
  }

  onChange = () => {
    // ...
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { width, height } = this.props
    const { minX, maxX, minY, maxY } = this.state
    return (
      <View style={[styles.container, { width, height }]}>
        <Draggable
          maxX={maxX}
          maxY={maxY}
          defaultX={minX}
          defaultY={minY}
          onChange={this.onChange}
        />
      </View>
    )
  }
}
