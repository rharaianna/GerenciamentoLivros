import React, { useState } from "react";
import { View, StyleSheet, Text,StatusBar, ScrollView, Alert} from "react-native";
import RoundBtn from "./RoundBtn";
import colors from "../misc/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../context/NoteProvider";
import BookInputModal from "./BookInputModal";


const BookDetail = (props) => {
    const [book,setBook] = useState(props.route.params.book)
    const{setBooks} = useBooks()
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const formatDate = (ms) =>{ 
        const date = new Date (ms)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const min = date.getMinutes()
        return `${day}/${month}/${year} - ${hours}:${min}`
    }

    
    const deleteBook = async() => {
        const result = await AsyncStorage.getItem('books');
        let books = [];
        if (result !== null) books = JSON.parse(result);

        const newBooks = books.filter(n => n.id !== book.id);
        setBooks(newBooks)
        await AsyncStorage.setItem('books',JSON.stringify(newBooks));

        props.navigation.goBack();
    }

    const displayDeleteAlert = () => {
        Alert.alert('Tem Certeza?', 'Esta ação irá deletar esta nota permanentemente!',[{
            text: 'Deletar',
            onPress: deleteBook,
        },
        {
            text: 'Cancelar',
            onPress: () => console.log('Cancelou ação')
        },
    ],{cancelable:true})
    }

    const handleUpdate = async (title, author, desc, time ) => {
        const result = await AsyncStorage.getItem('books')
        let books = [];
        if (result !== null) books = JSON.parse(result);
        
        const newBooks = books.filter(n => {
            if(n.id === book.id){
                n.title = title;
                n.author = author;
                n.desc = desc;
                n.isUpdated = true;
                n.time = time;

                setBook(n);
            }
            return n;
        })
        setBooks(newBooks)
        await AsyncStorage.setItem('books', JSON.stringify(newBooks))
    }
    const handleOnClose = () => setShowModal(false)

    const openEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }

    return(
        <>
            <ScrollView contentContainerStyle={styles.container}> 
                <Text style={styles.time}>{book.isUpdated ? `Atualizado em ${formatDate(book.time)}` : `Criado em ${formatDate(book.time)}`}</Text>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.desc}>{book.desc}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundBtn antIconName='edit' onPress={openEditModal}/>
                <RoundBtn antIconName='delete' style={{backgroundColor: colors.ERROR}} onPress={displayDeleteAlert}/>
            </View>
            <BookInputModal isEdit={isEdit} book={book} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:20,
        paddingTop: 50,
    },
    title:{
       fontSize:35,
       fontWeight: '900',

    },
    author:{
        fontSize:25,
        fontWeight: '800',
        fontStyle: 'italic', 
        opacity: 0.5,
    },
    desc:{
        fontSize:20,
    },
    time:{
        textAlign:'right',
        fontSize:12,
        opacity:0.5,
    },
    btnContainer:{
        position:'absolute',
        right: 20,
        bottom:50,
        gap:15,
    }
})

export default BookDetail;