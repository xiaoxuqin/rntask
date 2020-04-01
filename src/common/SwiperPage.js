import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
    start = () => {
        AsyncStorage.setItem('isInstall', 'true',()=>{
            this.props.afterInstall();
        });
    };

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Image
                        style={styles.img}
                        source={require('../img/start.png')}
                    />
                </View>
                <View style={styles.slide1}>
                    <Image
                        style={styles.img}
                        source={require('../img/start.png')}
                    />
                </View>
                <View style={styles.slide1} >
                    <Image
                        style={styles.img}
                        source={require('../img/start.png')}
                    />
                    <TouchableOpacity style={styles.start} onPress={this.start}>
                        <Text style={{ color: 'rgb(242,48,48)' }}>开始体验</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        );
    }
}
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    start: {
        position: 'absolute',
        bottom: 65,
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'rgb(242,48,48)',
        borderRadius: 20,
    },
});