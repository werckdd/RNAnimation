import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, PanResponder } from 'react-native'



export default class Sample3 extends Component {

    constructor() {
        super()
        this.state = {
            animationValue: new Animated.ValueXY()
        }
    }

    componentWillMount() {
        this._value={x:0,y:0}
        this.state.animationValue.addListener(value => this._value = value)
        this.panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                console.log(`parent start getValue ${this.state.animationValue.getLayout}`)
                this.state.animationValue.setOffset({
                    x: this._value.x,
                    y:this._value.y
                })
                this.state.animationValue.setValue({x:0,y:0})
            },
            onPanResponderMove: (evt, gestureState) => {
                this.state.animationValue.setValue({ x: gestureState.dx, y: gestureState.dy })
                console.log("parent move")
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                console.log("parent end")
                this.state.animationValue.flattenOffset()
                Animated.decay(this.animatedValue, {
                    deceleration: 0.997,
                    velocity: { x: gestureState.vx, y: gestureState.vy }
                }).start();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        })
    }

    render() {
        const animationStyle = {
            transform: this.state.animationValue.getTranslateTransform()
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animationStyle]} {...this.panResponder.panHandlers}>
                    <Text style={styles.text}>Drag me</Text>
                </Animated.View>
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
    box: {
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