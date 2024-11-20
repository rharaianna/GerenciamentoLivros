import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NoteScreen from './app/screens/NoteScreen';
import BookDetail from './app/components/BookDetail';
import NoteProvider from './app/context/NoteProvider';

const Stack= createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}> 
          <Stack.Screen component={NoteScreen} name='NoteScreen'/>
          <Stack.Screen component={BookDetail} name='BookDetail'/>
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
