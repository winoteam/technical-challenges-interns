/* @flow */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  swatch: {
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
})

type Props = {
  color: string,
}

export default class Swatch extends React.Component<Props> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { color } = this.props
    return (
      <View>
        <View style={[styles.swatch, { backgroundColor: color }]} />
        <Text style={styles.text}>{color}</Text>
      </View>
    )
  }
}
