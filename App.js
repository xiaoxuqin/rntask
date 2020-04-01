import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, ToastAndroid, AsyncStorage } from 'react-native';
import { Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/common/Login';
import Sign from './src/common/Sign';
import SwiperPage from './src/common/SwiperPage';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Publish from './src/userinfor/Publish';

console.disableYellowBox = true;

const App = () => {
    let [isLogin, setLogin] = useState(false);
    let [isInstall, setInstall] = useState(true);  //是否第一次安装
    let now = 0;
    let init = () => {
        // AsyncStorage.clear();
        AsyncStorage.getItem('isInstall')
            .then(res => {
                if (res) {
                    setInstall(false);
                }
            })
        AsyncStorage.getItem('user')
            .then(res => {
                let user = JSON.parse(res);
                if (!user) {
                    SplashScreen.hide();
                }
                if (user && user.token) {
                    setLogin(true);
                    SplashScreen.hide();
                }
            })
    }
    useEffect(() => {
        init();
    }, [])
    let afterInstall = () => {
        setInstall(false)
    }
    if (isInstall) {
        return <View style={{ flex: 1 }}>
            <SwiperPage afterInstall={afterInstall} />
        </View>
    }

    return (
        <Router
            backAndroidHandler={() => {
                if (Actions.currentScene === 'publish') {
                    return;
                }else if (Actions.currentScene === 'sign') {
                    return;
                }
                if (new Date().getTime() - now < 2000) {
                    BackHandler.exitApp();
                } else {
                    ToastAndroid.show('确定要退出吗', 100);
                    now = new Date().getTime();
                    return true;
                }
            }}>
            <Overlay>
                <Modal key='modal' hideNavBar>
                    <Lightbox key='lightbox'>
                        <Drawer
                            key='drawer'
                            contentComponent={() => <Text>drawer</Text>}
                            drawerIcon={() => <Icon name='menu' />}
                            drawerWidth={400}
                        >
                            <Scene key="root">
                                <Tabs
                                    key='tabbar'
                                    hideNavBar
                                    activeTintColor='rgb(242,48,48)'
                                    inactiveTintColor="rgb(151,151,151)"
                                    tabBarStyle={{ backgroundColor: 'white' }}
                                >
                                    <Scene key='homePage'
                                        title='首页'
                                        icon={({ focused }) => <Icon size={25} color={focused ? 'rgb(242,48,48)' : 'rgb(151,151,151)'} name='home' />}
                                    >
                                        <Scene key='home' hideNavBar={true} component={Home} />
                                    </Scene>
                                    <Scene key='goodsPage'
                                        title='商品分类'
                                        icon={({ focused }) => <Icon size={25} color={focused ? 'rgb(242,48,48)' : 'rgb(151,151,151)'} name='appstore-o' />}
                                    >
                                        <Scene key="goods" hideNavBar={true} component={Goods} />
                                    </Scene>
                                    <Scene key='userPage'
                                        title='用户中心'
                                        icon={({ focused }) => <Icon size={25} color={focused ? 'rgb(242,48,48)' : 'rgb(151,151,151)'} name='user' />}
                                    >
                                        <Scene key="user" hideNavBar={true} component={Userinfor} />
                                        <Scene key="publish" hideNavBar={true} component={Publish} />
                                    </Scene>
                                </Tabs>
                            </Scene>
                        </Drawer>
                    </Lightbox>
                    <Scene initial={!isLogin} key='login' hideNavBar component={Login} />
                    <Scene key="sign" component={Sign} hideNavBar />
                </Modal>
            </Overlay>
        </Router>
    );
};

export default App;