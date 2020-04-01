import React, { Component } from 'react';
import { StatusBar, View, Text, Image, Dimensions, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const s = width / 640;
const options = {
    title: '选择图片', 
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    chooseFromLibraryButtonTitle: '选择照片', 
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Userinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: require('../img/touxiang.png')
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('uri')
            .then(res => {
                if(res){
                    this.setState({
                        imageUrl: { uri: res }
                    })
                }
               
            })
    }
    selectPhotoTapped() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('didCancel');
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                this.setState({
                    imageUrl: { uri: response.uri }
                });
                AsyncStorage.setItem('uri', response.uri,
                    () => { console.log("set success"); }
                );
            }
        });
    }
    exit = ()=>{
        AsyncStorage.removeItem('user');
        Actions.login();
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'rgb(238,238,238)' }}>
                <View>
                    <StatusBar backgroundColor='rgb(242,48,48)' />
                    {/* 头像 */}
                    <View style={styles.header}>

                        <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
                            <Image source={this.state.imageUrl} style={{ width: 170 * s, height: 170 * s, marginLeft: 220 * s, marginTop: -30 * s, borderRadius: 100 }} />
                        </TouchableOpacity>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 210 * s,
                            paddingTop: 20 * s
                        }
                        }>BINNU&nbsp;DHILLON</Text>
                    </View>
                    {/* 我的个人中心 */}
                    <View style={styles.table}>
                        <Icon name='child-care' color={'rgb(195,195,195)'} size={26} />
                        <Text style={styles.tabletext}>我的个人中心</Text>
                    </View>
                    <View style={styles.list}>
                        {list1.map((item) => {
                            return (
                                <View style={styles.listicon}>
                                    {item.icon}
                                    <Text style={styles.listtext}>{item.text}</Text>
                                </View>
                            )
                        })}
                    </View>
                    {/* E族活动 */}
                    <View style={styles.table}>
                        <Icon3 name='sticky-note-o' color={'rgb(195,195,195)'} size={26} />
                        <Text style={styles.tabletext}>E族活动</Text>
                    </View>
                    <View style={styles.list}>
                        {list2.map((item) => {
                            return (
                                <View style={styles.listicon}>
                                    {item.icon}
                                    <Text style={styles.listtext}>{item.text}</Text>
                                </View>
                            )
                        })}
                        <View style={styles.listicon}>
                            <TouchableOpacity onPress={() => Actions.publish()}>
                                <Icon2 name='edit' color={'rgb(174,174,174)'} size={26} style={{marginLeft:15}}/>
                                <Text style={styles.listtext}>我的发布</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 尾部 */}
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity 
                            onPress={this.exit}
                            style={{
                                width:'40%',
                                height:50*s,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor:'rgb(242,48,48)',
                                borderWidth:1,
                                backgroundColor:'rgb(242,48,48)',
                                borderRadius:20
                            }}>
                            <Text style={{color:'white',fontSize:17}}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
/**
 * “个人中心”数据
 */
const list1 = [
    {
        icon: <Icon1 name='setting' color={'rgb(174,174,174)'} size={26} />,
        text: '账户管理'
    },
    {
        icon: <Icon2 name='map-pin' color={'rgb(174,174,174)'} size={26} />,
        text: '收货地址'
    },
    {
        icon: <Icon1 name='idcard' color={'rgb(174,174,174)'} size={26} />,
        text: '我的信息'
    },
    {
        icon: <Icon3 name='reorder' color={'rgb(174,174,174)'} size={26} />,
        text: '我的订单'
    },
    {
        icon: <Icon3 name='qrcode' color={'rgb(174,174,174)'} size={26} />,
        text: '我的二维码'
    },
    {
        icon: <Icon4 name='coins' color={'rgb(174,174,174)'} size={26} />,
        text: '我的积分'
    },
    {
        icon: <Icon1 name='staro' color={'rgb(174,174,174)'} size={26} />,
        text: '我的收藏'
    }
]
/**
 * “E族活动”数据
 */
const list2 = [
    {
        icon: <Icon5 name='wrench' color={'rgb(174,174,174)'} size={26} />,
        text: '居家维修保养'
    },
    {
        icon: <Icon1 name='car' color={'rgb(174,174,174)'} size={26} />,
        text: '出行接送'
    },
    {
        icon: <Icon1 name='user' color={'rgb(174,174,174)'} size={26} />,
        text: '我的受赠人'
    },
    {
        icon: <Icon3 name='bed' color={'rgb(174,174,174)'} size={26} />,
        text: '我的住宿优惠'
    },
    {
        icon: <Icon2 name='flag' color={'rgb(174,174,174)'} size={26} />,
        text: '我的活动'
    }
    // {
    //     icon: <Icon2 name='edit' color={'rgb(174,174,174)'} size={26} />,
    //     text: '我的发布'
    // }
]

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f23030',
        width: '100%',
        height: 260 * s,
        alignContent: 'center',
        justifyContent: 'center'
    },
    touxiang: {
        width: 120 * s,
        height: 120 * s,
        marginTop: 10,
        marginBottom: 20
    },
    table: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomWidth: 1 / 2,
        borderBottomColor: 'rgb(238,238,238)',
        paddingBottom: 10,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    tabletext: {
        color: 'rgb(78,78,78)',
        marginTop: 5,
        marginLeft: 10,
    },
    list: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        paddingTop: 25,
        marginBottom: 7
    },
    listicon: {
        alignItems: 'center',
        width: '33%',
        marginBottom: 17
    },
    listtext: {
        color: 'rgb(78,78,78)',
        marginTop: 3
    }
})