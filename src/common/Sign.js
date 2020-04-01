import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage,ToastAndroid,StyleSheet} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'

export default class Sign extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            starpwd: '',
        }
    }
    userhandle = (text) => {
        this.setState({
            username: text
        })
    }
    pwdhandle = (text) => {
        this.setState({
            pwd: text
        })
    }
    starpwdhandle = (text) => {
        this.setState({
            starpwd: text
        })
    }
    sign = () => {
        if(this.state.username && this.state.pwd && this.state.starpwd){
            myFetch.post('/login', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                if(res.data.status == '1'){
                    ToastAndroid.show('该用户已存在', 800)
                }else if(res.data.status == '2'){
                    ToastAndroid.show('网络连接错误', 800)
                }else if(this.state.pwd.length < 6){
                    ToastAndroid.show('请输入六位及以上字符密码', 800)
                }else if(this.state.pwd != this.state.starpwd){
                    ToastAndroid.show('两次密码输入不一致', 800)
                }else{
                    ToastAndroid.show('注册成功，请登录', 100)
                    AsyncStorage.setItem('user', JSON.stringify(res.data))
                    .then(() => {
                        console.log('success');
                        setTimeout(function(){
                            Actions.login();
                        },1000)
                    })
                }
            });
        }else if(!this.state.username){
            ToastAndroid.show('用户名不能为空', 1500)
        }else if(!this.state.pwd){
            ToastAndroid.show('密码不能为空', 1500)
        }else if(!this.state.starpwd){
            ToastAndroid.show('请再次确认密码', 1500)
        }
    }

    render() {
        return (
            <View
            style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgb(245,245,245)' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.txt}>
                        <Icon name='user' color='rgb(242,48,48)' />
                        <TextInput placeholder='用户名' onChangeText={this.userhandle} />
                    </View>
                    <View style={styles.txt}>
                        <Icon name='lock' color='rgb(242,48,48)' />
                        <TextInput placeholder='密码'
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.txt}>
                        <Icon name='star' color='rgb(242,48,48)' />
                        <TextInput placeholder='确认密码'
                            onChangeText={this.starpwdhandle}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => this.sign()}
                    >
                        <Text style={{color:'rgb(242,48,48)', fontSize:16}}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => Actions.pop()}>
                        <Text style={{color:'rgb(242,48,48)', fontSize:16}}>返回登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    txt:{
        width: '80%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    btn:{
        width: '60%',
        height: 40,
        backgroundColor: '#ccc',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:20,
        borderWidth:1,
        backgroundColor:'rgb(245,245,245)',
        borderColor:'rgb(242,48,48)'
    }
})