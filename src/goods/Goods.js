import React,{Component} from 'react';
import {
    StyleSheet,	
    View, 
    Text, 
    StatusBar,
    Dimensions,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { Icon } from '@ant-design/react-native';

const {width, scale} = Dimensions.get('window');
/** 450   2 */
const s = width / 640;
const goods = [
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/2.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/2.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../img/2.png')
    }
]
export default class Goods extends Component{
    constructor(){
        super();
        this.state = {
            tits: []
        }
    }
    render(){
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                {/* 状态栏 */}
                <StatusBar backgroundColor='rgb(242,48,48)' />
                {/* <StatusBar backgroundColor='#ccc' /> */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            placeholder='请输入商品名称'
                            style={{
                                width:490*s,
                                height:50*s,
                                padding:0,
                                paddingLeft:10
                            }}/>
                        <Icon name='search' />
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={{color:'red'}}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style={{backgroundColor:'#f4f4f4'}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode='contain'
                                source={item.img}
                                style={{
                                    height:180*s,
                                    marginTop:60*s
                                }}
                            />
                            <Text style={{marginTop:20}}>{item.title}</Text>
                            <Text style={{width:'100%', color:'red'}}>{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height: 70*s,
        borderBottomWidth:1/3,
        borderBottomColor:'#e8e8e8',
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        width:544*s,
        height:50*s,
        backgroundColor:'#eee',
        flexDirection:'row',
        alignItems:'center'
    },
    nav:{
        height:73*s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    good:{
        width:290*s,
        backgroundColor:'white',
        marginLeft:20*s,
        marginTop:20*s,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,
        alignItems:'center',
        justifyContent:'center'
    }
})