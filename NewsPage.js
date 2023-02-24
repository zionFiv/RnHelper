import { useLayoutEffect, useState } from "react";
import { View, Text, Image, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native"
import RenderHTML from "react-native-render-html";
import WebView from "react-native-webview";

const NewsPage = ({ route, navigation }) => {
    var vo = { title: '', cover: '', content: '', source: '', ptime: '' }
    const { newsId } = route.params;
    const [detail, setDetail] = useState({})
    useLayoutEffect(() => {

        _loadData()
    }, [])
    const { width } = useWindowDimensions();
    console.log("detail: ")
    console.log(detail)
    if ( typeof detail == 'undefined' || detail == null) {
        return <ActivityIndicator color={"red"}
            animating={true}>

        </ActivityIndicator>
    } else

        return <View style={{ paddingHorizontal: 16, paddingVertical: 20, backgroundColor: 'white' }}>
            <ScrollView>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{detail.title}</Text>
                <Image style={{ width: '100%', height: 120, marginVertical: 10 }} source={{ uri: detail.cover }} />
                <RenderHTML source={{ html: detail.content }} contentWidth={{ width }} />

                <Text style={{ textAlign: 'right' }}>{detail.source} {detail.ptime}</Text>
            </ScrollView>
        </View>;

    function _loadData() {
        var id = JSON.stringify(newsId)
        console.log("newsId " + "https://www.mxnzp.com/api/news/details?newsId=" + newsId + "&app_id=qmtjkrlbppnzuqwm&app_secret=aDRVSUF5dHErY0Yxb1gyQVJWbUc4dz09")
        fetch("https://www.mxnzp.com/api/news/details?newsId=" + newsId + "&app_id=qmtjkrlbppnzuqwm&app_secret=aDRVSUF5dHErY0Yxb1gyQVJWbUc4dz09")
            .then((repsonse) => repsonse.json())
            .then((responseJson) => {
                console.log(responseJson)
                setDetail(responseJson.data)
            })
    }

}

export default NewsPage;