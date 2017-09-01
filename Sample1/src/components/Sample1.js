import React, { Component } from 'react'
import { Text, View,  StyleSheet, Animated,Easing } from 'react-native'



export default class Sample1 extends Component {

    constructor() {
        super()
        this.state = {
            spinValue: new Animated.Value(0),
            translateValue: new Animated.ValueXY({ x: 0, y: 0 })
        }
    }

    an() {


        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: 10000,
                    easing: Easing.linear
                }),

                // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
                Animated.decay(this.state.translateValue, {
                    velocity: 10,// 起始速度，必填参数。
                    deceleration: 0.8, // 速度衰减比例，默认为0.997。
                })
            ]),
            Animated.delay(400), 
            Animated.stagger(1000,[
                Animated.timing(this.state.spinValue, {
                    toValue: 0,
                    duration: 10000,
                    easing: Easing.linear
                }),

                // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
                Animated.decay(this.state.translateValue, {
                    velocity: -10,// 起始速度，必填参数。
                    deceleration: 0.8, // 速度衰减比例，默认为0.997。
                })
            ]),
        ])
       .start(() => this.an())
    }   

    bn() {
        this.state.translateValue.setValue({ x: 0, y: 10 })
    }
    componentDidMount() {
       this.bn()
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.animation, { opacity: this.state.spinValue }]} >
                    <Text style={styles.text}>打我呀</Text>
                </Animated.View>
                <Animated.Image
                    style={{
                        width: 227,
                        height: 200,
                        transform: [{
                            rotate: this.state.spinValue.interpolate({
                                inputRange: [0, 1],
                                outputRange:['0deg','360deg']    
                            })
                        },
                        ]
                    }}
                    source={require('../images/reactjs.png')}
                />
                <Animated.View style={[
                    styles.animation,
                    {
                        transform: [
                        { translateX: this.state.translateValue.x },
                        { translateY: this.state.translateValue.y },]
                    }
                    ]} >
                    <Text style={styles.text}>setOffset</Text>
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
    animation: {
        width: 100,
        height: 100,
        backgroundColor: 'grey',

    },
    text: {
        textAlign: 'center',
        //使文本垂直居中
        lineHeight: 100
    }
});