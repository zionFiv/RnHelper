import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 10,

    },
    item: {

        fontFamily: '',
        flex:1


    },
});


const JokeList = (props) => {
    const [jokes, setJokes] = useState([])
    const [loading, setLoading] = useState(false)
    useLayoutEffect(() => {
        console.log("第一次");
        loadData()

    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={jokes}
                // data = {[
                // 	{key : 'tune in', value : '观看'},//
                // 	{key : 'progressively', value : '逐渐的'},
                // 	{key : 'crank', value : '古怪的，脾气暴躁的'},
                // 	{key : 'deal', value : '差事'},
                // 	{key : 'torture', value : '折磨'},
                // ]}
                renderItem={
                    ({ item, index }) =>
                        <View style={{flex:1,padding:10,borderRadius:4,backgroundColor:'white'}}>
                            <Text style={{ fontSize: 14, minWidth: 10, paddingRight: 10 }}> {index + 1}</Text>

                            <Text style={styles.item} textBreakStrategy='simple' > {item.content}</Text>
                        </View>
                }
                //下拉刷新 onRefresh refreshing
                onRefresh={() => {

                    loadData()
                }}
                refreshing={loading}

                //上拉加载

                ListFooterComponent={() => renderLoadMoreView()}
                onEndReached={() =>{
                    setTimeout(() => {
                        console.log("onEndReached")
                        if(jokes.length > 0)loadData()}, 2000)
                }}
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
        return <View style={{ flex: 1, alignItems: 'center' ,padding:20}}>
            <ActivityIndicator
                color={"red"}
                animating={true} />
            <Text>"正在加载"</Text>
        </View>

    }

    function loadData() {
        setLoading(true);
        fetch("https://www.mxnzp.com/api/jokes/list/random?app_id=gupungkptsnghgly&app_secret=cEZaSDg4bUs3bmNnMktkK2Q5NTFOQT09")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                setLoading(false)
                setJokes(responseJson.data)
            })


    }
    function loadMoreData() {
        setLoading(true);
        fetch("https://www.mxnzp.com/api/jokes/list/random?app_id=gupungkptsnghgly&app_secret=cEZaSDg4bUs3bmNnMktkK2Q5NTFOQT09")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                setLoading(false)
                setJokes(jokes.concat(responseJson.data))
            })


    }


}





export default JokeList;
