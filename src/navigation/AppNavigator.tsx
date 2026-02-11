import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import ProfileScreen from '../screens/ProfileScreen';

// 타입 정의
export type RootStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  Home: undefined;
  Record: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'white', height: 60, paddingBottom: 10 },
        tabBarActiveTintColor: '#EF4444',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Record" component={RecordScreen} options={{ title: '측정/녹화' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '프로필' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
