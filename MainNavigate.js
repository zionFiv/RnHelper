import * as React from 'react';
import {View, Text, Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from './NewsListPage';
import NewsPage from './NewsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JokeList from './Joke';

const NewsStack  = createNativeStackNavigator();
const NewsNavigate = () => {
    return ( 
        <NavigationContainer>
            <NewsStack.Navigator initialRouteName = "newsList" screenOptions={{headerShown:false}}>
                <NewsStack.Screen name = "newsList" component={MainNavigate} />
                <NewsStack.Screen name = "NewsDetail" component={NewsPage}  />
               
            </NewsStack.Navigator>
            </NavigationContainer>
        );
}

const JokeStack = createNativeStackNavigator();

const JokeNavigate = () => {
    return ( 
            <JokeStack.Navigator initialRouteName = "jokeList" screenOptions={{headerShown:false}}>
                <JokeStack.Screen name = "jokeList" component={JokeList} />
               
            </JokeStack.Navigator>
     
        );
}

const Tab = createBottomTabNavigator();
const MainNavigate = () => {
    return (
        
            <Tab.Navigator  screenOptions={({ route }) => ({
                headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Image style={{width: 30, height:40}} source={require('./img/default.png')}/>;
            
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
      
        })}
      >
                <Tab.Screen name = "News" component={NewsList} options={{title:"新闻", tabBarLabelStyle:{fontSize:16,fontWeight:'bold',padding:3}}}/>
                <Tab.Screen name = "Joke" component={JokeNavigate} options={{title:"段子", tabBarLabelStyle:{fontSize:16,fontWeight:'bold', padding:3}}}/>
            </Tab.Navigator>
         
        
    )
}

export default NewsNavigate;
