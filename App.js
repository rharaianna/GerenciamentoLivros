import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NoteScreen from './app/screens/NoteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookDetail from './app/components/BookDetail';
import { NavigationContainer } from '@react-navigation/native';

const Stack= createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}> 
        <Stack.Screen component={NoteScreen} name='NoteScreen'/>
        <Stack.Screen component={BookDetail} name='BookDetail'/>
      </Stack.Navigator>
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
