/* @flow */

import React from 'react'
import { StyleSheet, View, Animated, PanResponder } from 'react-native'

const SIZE = 32
const TOUCHABLE_PADDING = 12

const styles = StyleSheet.create({
  container: {
    marginTop: -TOUCHABLE_PADDING,
    marginLeft: -TOUCHABLE_PADDING,
    padding: TOUCHABLE_PADDING,
  },
  main: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255,0.9375)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
})

type Props = {
  maxX: number,
  maxY: number,
  defaultX?: number,
  defaultY?: number,
}

type State = {
  pan: Animated,
  position: { x: number, y: number },
}

export default class Draggable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { defaultX, defaultY, maxX, maxY } = props
    const defaultCoordinates = { x: defaultX || 0, y: defaultY || 0 }
    this.state = {
      pan: new Animated.ValueXY(defaultCoordinates),
      position: defaultCoordinates,
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this.state.position.x,
          y: this.state.position.y,
        })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (e, gestureState) => {
        const x = this.state.pan.x._offset + gestureState.dx
        const y = this.state.pan.y._offset + gestureState.dy
        if (
          x < -SIZE / 2 ||
          x > maxX - SIZE / 2 ||
          (maxY !== 0 &&
            (x < -SIZE / 2 ||
              x > maxX - SIZE / 2 ||
              y < -SIZE / 2 ||
              y > maxY - SIZE / 2))
        ) {
          return null
        }
        Animated.event([
          null,
          maxY === 0
            ? { dx: this.state.pan.x }
            : { dx: this.state.pan.x, dy: this.state.pan.y },
        ])(e, gestureState)
      },
    })
  }

  componentDidMount() {
    const { onChange } = this.props
    this.state.pan.addListener(position => {
      this.state.position = position
      onChange(position)
    })
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { style } = this.props
    const { pan } = this.state
    const panStyle = { transform: pan.getTranslateTransform() }
    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.main, panStyle, style]}
        />
      </View>
    )
  }
}
