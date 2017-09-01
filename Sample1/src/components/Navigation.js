import { StackNavigator, TabNavigator } from 'react-navigation'

import Main from './Main'
import Sample1 from './Sample1'
import Sample2 from './Sample2'
import Sample3 from './Sample3'

const Navigation = StackNavigator(
    {
        Home: { screen: Main },
        Sample1: { screen: Sample1 },
        Spring: { screen: Sample2 },
        Decay:{screen:Sample3}
    },
    {
        initialRouteName: 'Home',
        navigationOptions: { // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            headerBackTitle: '返回', // 左上角返回键文字
            headerStyle: {
                backgroundColor: '#DDA0DD',
            },
            headerTitleStyle: {
                color: 'white',
                alignSelf: 'center',
            },
            cardStack: {
                gesturesEnabled: true
            }
        },
        mode: 'card'
    } 
)

export default Navigation