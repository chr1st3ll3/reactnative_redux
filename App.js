import React, { useState } from 'react';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Signup from './screens/Signup';
import Panels from './screens/Panels';
import Themes from './screens/Themes';
import TodoApp from './screens/TodoApp';
import Posts from './screens/Posts';
import Medias from './screens/Medias';
import Map from './screens/Map';
import Members from './screens/Members';
import Kts from './screens/Kts';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Pressable, Text, View } from 'react-native';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to our Home Screen</Text>
      <Text>Checkout screens from the tab below</Text>
       <Pressable
        onPress={() => navigation.openDrawer()}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
}


function Members2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 20}}>Our Story</Text>
       <Pressable
        onPress={() => navigation.navigate('Members')}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Go to Conference</Text>
      </Pressable>
    </View>
  );
}

function MainDrawer() {
  return(
    <Drawer.Navigator>
        <Drawer.Screen name="Tabs" component={Tabs} options={{ headerShown: true, title: 'PANELS' }} />
        <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  )
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Panels" component={Panels} options={{ headerShown: false, title: 'PANELS', tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="solar-panel" color={color} size={26}/> ) }} />
    </Tab.Navigator>
  );
}

function PanelDetailTabs({navigation}) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Themes" component={Themes} 
          options={{ headerShown: true, title: 'Themes', gestureEnabled: true,
          headerLeft: () => (
            <Icon
                size={23}
                color="red"
                onPress={() => navigation.toggleDrawer() }
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}></Icon>
          ),tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="view-quilt" color={color} size={26}/> )}} />
        <Tab.Screen name="Map" component={Map} 
          options={{ headerShown: true, title: 'Map',
          headerLeft: () => (
            <Icon
                size={23}
                color="red"
                onPress={() => navigation.toggleDrawer() }
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}></Icon>
          ),
          tabBarIcon: ({ color, size })=> ( <MaterialCommunityIcons name="chart-bubble" color={color} size={26}/> ) }} />
        <Tab.Screen name="Medias" component={Medias} 
          options={{ headerShown: true, title: 'Medias',
          headerLeft: () => (
            <Icon
                size={23}
                color="red"
                onPress={() => navigation.toggleDrawer() }
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}></Icon>
          ),
          tabBarIcon: ({ color, size })=> ( <MaterialCommunityIcons name="image-multiple" color={color} size={26}/> ) }} />
        <Tab.Screen name="Members" component={Members} 
          options={{ headerShown: true, title: 'Members',
          headerLeft: () => (
            <Icon
                size={23}
                color="red"
                onPress={() => navigation.toggleDrawer() }
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}></Icon>
          ), tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="account" color={color} size={26}/> ) }} />
      </Tab.Navigator>
    );
  }

function PanelDetail() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="PanelDetailTabs" component={PanelDetailTabs}  options={{ headerShown: false, title: 'Panels' }} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    )
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} options={{headerTitle: 'Member login', headerTintColor: 'darkred', tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="login" color={color} size={26}/> )}} />
      <Tab.Screen name="Signup" component={Signup} options={{headerShown: false, tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="account-circle" color={color} size={26}/> )}} />
      <Tab.Screen name="TodoApp" component={TodoApp} options={{headerShown: true, headerTitle: 'Todo sample', tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="note-text" color={color} size={26}/> )}} />
    </Tab.Navigator>
  );
}

function ThemesTabs({navigation, route}) {
  const { syndicate_id, syndicate_question_id, theme_index, theme_title, question_html, active } = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Posts}  
        options={{headerShown: true, headerTitle: 'Posts', headerTintColor: 'darkred', gestureEnabled: true,
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack() }
            title="< Back"
            color="blue"
          />
        ), tabBarIcon: ({ color, size })=> ( <MaterialCommunityIcons name="note" color={color} size={26}/> )}} initialParams={{syndicate_id,syndicate_question_id, theme_index, theme_title, question_html, active}}/>
      <Tab.Screen name="KTs" component={Kts} 
        options={{headerShown: true, headerTitle: 'KTs', headerTintColor: 'darkred',
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack() }
            title="< Back"
            color="blue"
          />
        ), tabBarIcon: ({ color, size })=> ( <MaterialCommunityIcons name="magnify" color={color} size={26}/> )}}  initialParams={{syndicate_id,syndicate_question_id}} />
    </Tab.Navigator>
  )
}

function Test() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="PanelDetail" component={PanelDetail} options={{ headerShown: false, title: 'MainTabs screen'  }} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false, title: 'Todo screen' }} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false, title: 'MainDrawer screen' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function Main() {
    return (
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false, title: 'Main screen', gestureEnabled: false }} />
          <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false, title: 'MainDrawer screen' }} />
          <Stack.Screen name="PanelDetail" component={PanelDetail} options={{ headerShown: false, title: 'PanelDetail screen', gestureEnabled: false }} />
          <Stack.Screen name="ThemesTabs" component={ThemesTabs} options={{ headerShown: false, gestureEnabled: true }} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default function App() {
  return (
    <Provider store = { store }>
      <Main />
    </Provider>
  );
}