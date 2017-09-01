import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, PanResponder } from 'react-native'



export default class Sample3 extends Component {

    constructor() {
        super()
        this.state = {
            animationValue: new Animated.ValueXY({ x: 0, y: 0 }),
            bg:'#333'
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                
                //如果你设置了offset为100，而Animated.Value的值为50，那么动画执行的时候使用的值是150.
                //每次都会重新从屏幕中间开始移动，offset可以保存上次移动的距离，这样可以保证下次从上次开始的地方开始移动
                this.state.animationValue.setOffset({
                    x: this.state.animationValue.x._value,
                    y: this.state.animationValue.y._value
                })
                this.state.animationValue.setValue({ x: 0, y: 0 }),
                this.setState({bg:'red'})    
            },
            onPanResponderMove: (evt, gestureState) => {
                this.state.animationValue.setValue({ x: gestureState.dx, y: gestureState.dy })
                console.log(`parent move getValue ${JSON.stringify(this.state.animationValue.x._value)}`)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                /**
                 * flattenOffset() {
                 *       this._value += this._offset;
                 *       this._offset = 0;
                 *      }
                 */
                this.state.animationValue.flattenOffset()
                this.setState({ bg: '#333' })  
                
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
            transform: this.state.animationValue.getTranslateTransform(),
            backgroundColor:this.state.bg
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
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFF"
    }
});