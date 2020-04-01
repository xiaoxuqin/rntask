import React, { Component } from 'react'
import { FlatList, StatusBar, TextInput, Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
const s = width / 640;

export default class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(245,245,245)' }}>
                <StatusBar backgroundColor='rgb(242,48,48)' />
                {/* 搜索框 */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Icon name='search1' color={'white'} size={24} />
                        <TextInput
                            placeholder='请输入您要搜索的关键字'
                            placeholderTextColor='white'
                            style={styles.sinput} />
                    </View>
                    <Icon name='shoppingcart' color={'white'} size={28} />
                </View>
                {/* 轮播图 */}
                <View style={{ height: 273*s }}>
                    <Swiper
                        autoplay={true}
                        paginationStyle={{bottom: 10}}
                        dot={<View style={styles.dot}/>}
                        activeDot={<View style={styles.activedot}/>}
                    >
                        <Image style={{height:273*s,width:'100%'}} source={require('../img/banner2.png')} />
                        <Image style={{height:273*s,width:'100%'}} source={require('../img/banner1.png')} />
                        <Image style={{height:273*s,width:'100%'}} source={require('../img/banner2.png')} />
                    </Swiper>
                </View>
                {/* 列表 */}
                <View style={{ height: 390 }}>
                    <FlatList
                        data={list}
                        renderItem={
                            ({ item }) => (
                                <View style={styles.listout}>
                                    <View style={[styles.circle, { backgroundColor: item.backgroundColor }]}>
                                        {item.icon}
                                    </View>
                                    <Text style={styles.font}>{item.text}</Text>
                                    <View style={styles.right}>
                                        <Icon name='right' color={'rgb(232,232,232)'} size={18} />
                                    </View>
                                </View>
                            )
                        }
                    />
                </View>
                {/* 按钮、版权 */}
                <View style={styles.btn}>
                    <Button style={styles.btntext}>发布需求</Button>
                </View>
                <View style={styles.ezu}>
                    <Text style={styles.efont}>©E族之家&nbsp;版权所有</Text>
                </View>
            </View>
        )
    }
}
/**
 * 数据
 */
const list = [
    {
        backgroundColor: 'rgb(255,204,204)',
        icon: <Icon1 name='tools' color={'rgb(180,64,94)'} size={43} />,
        text: '居家维修保养'
    },
    {
        backgroundColor: 'rgb(255,225,177)',
        icon: <Icon name='flag' color={'rgb(226,79,50)'} size={43} />,
        text: '住宿优惠'
    },
    {
        backgroundColor: 'rgb(191,230,168)',
        icon: <Icon2 name='md-speedometer' color={'rgb(0,211,202)'} size={43} />,
        text: '出行接送'
    },
    {
        backgroundColor: 'rgb(195,221,242)',
        icon: <Icon name='gift' color={'rgb(25,151,221)'} size={43} />,
        text: 'E族活动'
    }
]
/**
 * 样式
 */
const styles = StyleSheet.create({
    header: {
        height: 70 * s,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(242,42,48)'
    },
    search: {
        width: 528 * s,
        height: 50 * s,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(251,184,184)',
        marginRight: 15,
        paddingLeft: 20,
        borderRadius: 20
    },
    sinput: {
        width: 460 * s,
        height: 50 * s,
        padding: 0,
        paddingLeft: 15,
        fontSize: 15
    },
    listout: {
        width: '100%',
        height: 110 * s,
        marginTop: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 65,
        height: 65,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25
    },
    font: {
        color: 'rgb(125,125,125)',
        fontSize: 16
    },
    right: {
        position: "absolute",
        right: 20
    },
    btn: {
        alignItems: 'center',
        // marginTop: -52 * s
    },
    btntext: {
        width: 540 * s,
        height: 67 * s,
        backgroundColor: 'rgb(242,48,48)',
        color: 'white',
        borderRadius: 10,
        paddingTop: 12
    },
    ezu: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    efont: {
        color: 'rgb(118,118,118)',
        fontSize: 12
    },
    dot: {           
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    },
    activedot: {
        backgroundColor: 'rgb(254,4,3)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    }
})