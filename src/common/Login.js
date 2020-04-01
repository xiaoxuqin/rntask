import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage,ToastAndroid,StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: ''
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
    login = () => {
        if(this.state.username && this.state.pwd ){
            myFetch.post('/login', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                if(res.data.status == '2'){
                    ToastAndroid.show('网络连接错误', 800)
                }else if(this.state.pwd.length < 6){
                    ToastAndroid.show('密码至少六位字符，请重新核对密码', 800)
                }else{
                    ToastAndroid.show('正在登录 loading.....', 1500)
                    AsyncStorage.setItem('user', JSON.stringify(res.data))
                    .then(() => {
                        console.log('success');
                        setTimeout(function(){
                            Actions.homePage();
                        },1000)
                    })
                }
            });
        }else if(!this.state.username){
            ToastAndroid.show('用户名不能为空', 1500)
        }else if(!this.state.pwd){
            ToastAndroid.show('密码不能为空', 1500)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgb(245,245,245)' }}>
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
                    <TouchableOpacity style={styles.btn}
                        onPress={() => this.login()}
                    >
                        <Text style={{color:'rgb(242,48,48)', fontSize:16}}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={()=>Actions.sign()}>
                        <Text style={{color:'rgb(242,48,48)', fontSize:16}}>注册</Text>
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