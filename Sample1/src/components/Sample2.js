import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native'



export default class Sample2 extends Component {

    constructor() {
        super()

        this.handlePressIn = this.handlePressIn.bind(this)
        this.handlePressOut = this.handlePressOut.bind(this)
    }

    componentWillMount() {
        this.animationValue = new Animated.Value(1)
    }

    handlePressIn() {
        Animated.spring(this.animationValue, {
            toValue:.5
        }).start()
    }

    handlePressOut() {
        Animated.spring(this.animationValue, {
            toValue: 1,
            friction: 3,
            tension:40
        }).start()
    }

    render() {
        const animationStyle = {
            transform:[{scale:this.animationValue}]
        }
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                >
                    <Animated.View style={[styles.button,animationStyle]}>
                        <Text style={styles.text}>Press me</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#333",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFF"
    }
});