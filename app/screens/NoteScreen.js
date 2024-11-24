import React, { useEffect, useState} from "react";
import { View, StyleSheet, Text,StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundBtn from "../components/RoundBtn";
import BookInputModal from "../components/BookInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Book from "../components/Book";
import { useBooks } from "../context/NoteProvider";
import NotFound from "../components/NotFound";

const reverseData = data => {
    return data.sort((a,b)=>{
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if (aInt<bInt) return 1;
        if (aInt==bInt) return 0;
        if (aInt>bInt) return -1;
    });
};

const NoteScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState (false)
    const [searchQuery, setSearchQuery]= useState('')
    const [resultNotFound, setResultNotFound] = useState(false)
    
    const {books, setBooks,findBooks} = useBooks()

    const handleOnSubmit = async (title, author, desc) => {
        const book = {id: Date.now(), title, author, desc, time:Date.now()};
        const updatedBooks = [...books, book];
        setBooks(updatedBooks)
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks))
    }

    

    const openNote = (book) =>{
        navigation.navigate('BookDetail', {book});
    };


    const handleOnSearchInput = async(text) =>{
        setSearchQuery(text);
        if(!text.trim()){
            setSearchQuery('')
            setResultNotFound(false);
            return await findBooks();
        }
        const filteredBooks = books.filter(book => {
            if(book.title.toLowerCase().includes(text.toLowerCase())){
                return book;
            }
        })

        if(filteredBooks.length){
            setBooks([...filteredBooks])
        }else{
            setResultNotFound(true);
        }
    };

    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findBooks()
    }

    const reverseBooks = reverseData(books)
    
    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT}/>
        <TouchableWithoutFeedback onPress={() =>{if (Keyboard.isVisible()) {Keyboard.dismiss();}}}>
            <View style={styles.container}> 
                <Text style={styles.header}> Minha Biblioteca </Text>
                {books.length ? <SearchBar onClear={handleOnClear} value={searchQuery} onChangeText={handleOnSearchInput} containerStyle={{marginVertical:15}}/> : null}
                {resultNotFound ? <NotFound/> :
                <FlatList data={reverseBooks} keyExtractor={item=>item.id.toString()} renderItem={({item})=> (<Book onPress={() => openNote(item)} item = {item}/>)}/> }
                
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
    header:{
        fontSize:25,
        fontWeight: 'bold',
    },

    container: {
        padding:20,
        marginTop:30,
        flex:1,
        zIndex:1,
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
        zIndex:1,
    },
})

export default NoteScreen;