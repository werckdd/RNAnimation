import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
    textArea: {
        marginTop: 10,
    },
    bt: {
        height: 40,
        width: 170,
        borderRadius: 20,
        marginTop:20,
        backgroundColor: 'green',
        overflow:'hidden'
    },
    btText: {
        textAlign: 'center',
        marginTop:10,
        color:'white'
    }
});

export default class Main extends Component {

    static navigationOptions = {
        title:'Home'
    }
        
    render() {
        const {dispatch,goBack,navigate,setParams,state} = this.props.navigation
        console.log(state)
        return (
            <View style={styles.container}>
                <Text style={styles.textArea}>下面展示几种Animation</Text>
                <TouchableOpacity style={styles.bt} onPress={() => navigate('Sample1')}>
                    <Text style={styles.btText}>Go to Sample1</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.bt} onPress={() => navigate('Spring')}>
                    <Text style={styles.btText}>Go to Sample2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bt} onPress={() => navigate('Decay')}>
                    <Text style={styles.btText}>Go to Sample3</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



