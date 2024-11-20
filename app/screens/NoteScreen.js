import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundBtn from "../components/RoundBtn";
import BookInputModal from "../components/BookInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Book from "../components/Book";

const NoteScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState (false)
    const [books, setBooks] = useState([])

    const handleOnSubmit = async (title, author, desc) => {
        const book = {id: Date.now(), title, author, desc, time:Date.now()};
        const updatedBooks = [...books, book];
        setBooks(updatedBooks)
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks))
    }

    const findBooks = async () => {
        const result = await AsyncStorage.getItem('books');
        if (result!==null) setBooks(JSON.parse(result));
    }

    const openNote = (book) =>{
        navigation.navigate('BookDetail', {book});
    };

    useEffect(()=>{
        findBooks();
    },[])
    
    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT}/>
        <TouchableWithoutFeedback onPress={() =>{if (Keyboard.isVisible()) {Keyboard.dismiss();}}}>
            <View style={styles.container}> 
                <Text style={styles.header}> Minha Biblioteca </Text>
                {books.length ? <SearchBar containerStyle={{marginVertical:15}}/> : null}
                
                <FlatList data={books} keyExtractor={item=>item.id.toString()} renderItem={({item})=> (<Book onPress={() => openNote(item)} item = {item}/>)}/>
                
                {!books.length ? 
                <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}> Adicionar Livros </Text>
                </View> : null}
            </View>
        </TouchableWithoutFeedback>
        <RoundBtn onPress={()=> setModalVisible(true)} antIconName='plus' style={styles.addBtn}/>
        <BookInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
        flex:1,
        zIndex:-1,
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
        zIndex:1,

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