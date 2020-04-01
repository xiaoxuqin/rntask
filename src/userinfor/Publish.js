/**
 * ./components/Publish.js
 * 我的发布.psd
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,FlatList,Dimensions,TouchableOpacity,ToastAndroid,StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const s = width / 640;
export default class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],  
            nowPage: 1,  // 1+(n-1)*11 - n*11     11*n-10  =>  11*n
        }
    }
    componentDidMount() {
        fetch('https://cnodejs.org/api/v1/topics')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data,
                });
            });
    }
    next = ()=>{
        if(this.state.nowPage >= this.state.data.length/11){
            ToastAndroid.show("这已经是最后一页！",1000);
        }else{
            this.setState({
                nowPage:this.state.nowPage+1
            })
        }
    }
    last = ()=>{
        if(!(this.state.nowPage-1)){
            ToastAndroid.show("这已经是第一页！",1000);
        }else{
            this.setState({
                nowPage:this.state.nowPage-1
            })
        }
    }

    render() {
        this.state.data.map((item) => {
            if (item.title.length > 15) 
                item.title = item.title.slice(0, 15) + '...';
            item.create_at = item.create_at.slice(0, 10);
        })
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(238,238,238)',width:'100%' }}>
                <StatusBar backgroundColor='rgb(242,48,48)' />
                {/* top */}
                <View style={styles.top}>
                    <Icon color='white' name='left' onPress={Actions.pop} size={23} />
                    <Text style={styles.topT}>我的发布</Text>
                    <Icon1 color='white' name='dots-horizontal' size={26} />
                </View>

                {/* list */}
                <View style={styles.list}>
                    <FlatList
                        data={this.state.data.slice(11 * (this.state.nowPage - 1), 11 * this.state.nowPage)}
                        renderItem={
                            ({ item }) => {
                                var m = Math.random();
                                if (m > 0.5) {
                                    return (
                                        <View style={styles.listout}>
                                            <Text style={styles.listtitle}>{item.title}</Text>
                                            <Text style={styles.listtime}>{item.create_at}</Text>
                                            <Text style={[{color: 'gray' },styles.ans]}>已回复</Text>
                                        </View>
                                    )
                                }
                                else {
                                    return (
                                        <View style={styles.listout}>
                                            <Text style={styles.listtitle}>{item.title}</Text>
                                            <Text style={styles.listtime}>{item.create_at}</Text>
                                            <Text style={[{color: 'rgb(242,48,48)'},styles.ans]}>待回复</Text>
                                        </View>
                                    )
                                }
                            }
                        }
                    />

                    {/* page */}
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.last()} >
                            <Text style={styles.btnT}>上一页</Text>
                        </TouchableOpacity>
                        <View style={styles.page}>
                            <Text style={styles.pageT}>第&nbsp;{this.state.nowPage}&nbsp;页</Text>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => this.next()} >
                            <Text style={styles.btnT}>下一页</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top:{
        width: '100%',
        height: 55 * s,
        backgroundColor: 'rgb(242,48,48)',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    topT:{
        color: 'white', fontSize: 20, width: 360,
        textAlign: 'center'
    },
    list:{
        width: '100%', 
        height: 910*s, 
        backgroundColor: 'white'
    },
    listout:{
        position: 'relative',
        width: '100%',
        height: 70 * s,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    listtitle:{
        color: 'gray',
        paddingTop: 20,
        paddingLeft: 15
    },
    listtime:{
        color: 'gray',
        position: 'absolute',
        left: 300,
        top: 20
    },
    ans:{
        position: 'absolute',
        left: 390,
        top: 20,
    },
    btn:{
        width: 150 * s,
        height: 60 * s,
        backgroundColor: 'rgb(242,48,48)',
        justifyContent: 'center',
        borderRadius: 20
    },
    btnT:{
        color: 'white',
        textAlign: 'center'
    },
    page:{
        width:140*s,
        height:100*s,
        marginLeft:80*s,
        flexDirection:'row',
   },
   pageT:{
        fontSize:15,
        lineHeight:60*s,
        textAlign:'center',
    }
})