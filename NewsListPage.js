
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Button, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    },
    typeList: {
        flex: 1,
        height: '10%',

    },
    red: {
        color: 'red',
        fontWeight: 'bold',
    },
    black: {
        color: 'black',
        fontWeight: 'normal'
    }
})

const NewsList = ({ navigation }) => {
    const [types, setTypes] = useState([])
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const [type, setType] = useState({})

    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        console.log("111");
        loadTypeData()
    }, [])

    return (
        <View
            style={styles.container}>
            <FlatList
                data={types}

                renderItem={

                    ({ item, index }) => <View style={styles.container}>

                        <TouchableOpacity onPress={() => {
                            _loadData(item.typeId, 1, false)
                            setPage(1)
                            setType(item)
                        }}>
                            <Text style={item.typeId != type.typeId ? styles.black : styles.red}>{item.typeName}</Text>
                        </TouchableOpacity>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                horizontal={true}

            />
            <FlatList
                data={news}

                renderItem={
                    ({ item, index }) => {
                        var imgStr
                        if (typeof item !== 'undefined'  && item.imgList != null)
                            imgStr = item.imgList[0].toString()
                        console.log(index + " img " + imgStr)

                        return <TouchableOpacity
                            onPress={() => {
                                console.log("onpress")
                                navigation.navigate('NewsDetail', {
                                    newsId: item.newsId,
                                })
                            }}
                        >
                            <View style={{
                                borderRadius: 4,
                                backgroundColor: 'white', padding: 10
                            }}>


                                <Text style={{ fontSize: 16, fontWeight: 'bold' }} > {item.title}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 10, flex: 1 }}>
                                    <Image style={{ width: 80, height: 70, borderRadius: 2 }} source={{ uri: imgStr }} />
                                    <Text style={{ flex: 1, fontSize: 12, marginHorizontal: 10 }} numberofLines={4} ellipsizeMode={'tail'}>{item.digest}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    }
                }

                onRefresh={() => {
                    console.log("page__ " + page)
                    setPage(1)
                    _loadData(type.typeId, 1, false)

                }}
                refreshing={loading}

                ListFooterComponent={
                    () => renderLoadMoreView()
                }
                onEndReached={
                    () => {
                        
                        if (news != null && typeof type.typeId != 'undefined') {
                            setTimeout(() => {
                                console.log("onEndReached item " + type.typeId)
                                console.log("onEndReached news " + news)
                                _loadData(type.typeId, page, true)
                            }, 2000)

                        }

                    }

                }
                ItemSeparatorComponent={
                    () => {
                        return <View style={{ height: 10 }} />
                    }
                }

                showsVerticalScrollIndicator={false}

            />
        </View>

    );

    function renderLoadMoreView() {
        return <View style={{ flex: 1, alignItems: 'center' }}>
            <ActivityIndicator
                color={"red"}
                animating={true} />
            <Text style={{ fontSize: 12, justifyContent: 'center' }}>"正在加载"</Text>
        </View>

    }

    function loadTypeData() {

        fetch("https://www.mxnzp.com/api/news/types?app_id=qmtjkrlbppnzuqwm&app_secret=aDRVSUF5dHErY0Yxb1gyQVJWbUc4dz09")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                setTypes(responseJson.data)


            })

    }

    function _loadData(id, page, isMore) {
        console.log('_loadData id : ' + id + " page " + page)
        setLoading(true)
        fetch("https://www.mxnzp.com/api/news/list?typeId=" + id + "&page=" + page + "&app_id=qmtjkrlbppnzuqwm&app_secret=aDRVSUF5dHErY0Yxb1gyQVJWbUc4dz09")
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                console.log(responseJson)
                if (isMore) { 
                    setPage(page + 1) 
                   var newList =  news.concat(responseJson.data)
                   setNews(newList)
                } else {
                    setNews(responseJson.data)
                }
                
                
            })
    }

}



export default NewsList;