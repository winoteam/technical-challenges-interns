/* @flow */

import React from 'react'
import { StyleSheet, View } from 'react-native'

import Saturation from './Saturation'
import Hue from './Hue'
import Swatch from './Swatch'

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  controls: {
    marginRight: 48,
  },
  hue: {
    marginTop: 12,
  },
})

type Props = {}

type State = {|
  +color: string,
|}

export default class ColorPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { color: '#fe0' }
  }

  render() {
    const { color } = this.state
    return (
      <View style={styles.content}>
        <View style={styles.controls}>
          <Saturation />
          <View style={styles.hue}>
            <Hue />
          </View>
        </View>
        <Swatch color={color} />
      </View>
    )
  }
}
