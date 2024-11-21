import React from "react";
import { View, StyleSheet, Text,StatusBar } from "react-native";
import {AntDesign} from '@expo/vector-icons'

const NotFound = () => {
    return(
        <View style={[StyleSheet.absoluteFillObject, styles.container]}> 
            <AntDesign name="frowno" size={90} color='black'/> 
            <Text style={styles.text}>Não encontrado</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex:-1,
    },
    text:{
        margin:20,
        fontSize:20,
    }
})

export default NotFound;



