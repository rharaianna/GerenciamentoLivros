import React from "react";
import { View, StyleSheet, Text,StatusBar, RootTagContext } from "react-native";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundBtn from "../components/RoundBtn";

const NoteScreen = () => {
    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT}/>
        <View style={styles.container}> 
            <Text style={styles.header}> Minha Biblioteca </Text>
            <SearchBar containerStyle={{marginVertical:15}}/>
            <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                <Text style={styles.emptyHeader}> Adicionar Livros </Text>
                <RoundBtn onPress={()=> console.log('abriu')} antIconName='plus' style={styles.addBtn}/>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
        flex:1,
    },
    header:{
        fontSize:25,
        fontWeight: 'bold',
    },
    emptyHeader:{
        fontSize:30,
        fontWeight: 'bold',
        textTransform:'uppercase',
        opacity:0.2,

    },
    emptyHeaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        zIndex:-1,
    },
    addBtn:{
        position:'absolute',
        right:20,
        bottom:50,
    },
})

export default NoteScreen;