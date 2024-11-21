import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,StatusBar, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import colors from "../misc/colors";
import RoundBtn from "./RoundBtn";

const BookInputModal = ({visible, onClose, onSubmit, book, isEdit}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')

    
    useEffect(()=>{
        if(isEdit){
            setTitle(book.title);
            setAuthor(book.author);
            setDesc(book.desc);
        }
    },[isEdit])
    
    const handleModalClose = () =>{
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor==='title') setTitle(text);
        if(valueFor==='author') setAuthor(text);
        if(valueFor==='desc') setDesc(text);
    };

    const handleSubmit = () => {
        if(!title.trim() && !author.trim() && !desc.trim()) return onClose();

        if(isEdit) {
            onSubmit(title,author,desc, Date.now());
        }else{
            onSubmit(title, author, desc);
            setTitle('');
            setAuthor('');
            setDesc('');
        }
        onClose();
    };

    const closeModal = () => {
        if(!isEdit){
            setTitle('');
            setAuthor('');
            setDesc('');
        }
        onClose();
    }

    return(
        <>
            <StatusBar hidden/>
            <Modal  visible={visible} animationType="fade"> 
                <View style={styles.container}>
                    <TextInput 
                        value={title}
                        style={[styles.input, styles.title]} 
                        placeholder="Título" 
                        onChangeText={(text)=>handleOnChangeText(text, 'title')}/> 
                    <TextInput 
                        value={author}
                        style={[styles.input, styles.author]} 
                        placeholder="Autor" 
                        onChangeText={(text)=>handleOnChangeText(text, 'author')}/> 
                    <TextInput 
                        value={desc}
                        multiline 
                        style={[styles.input, styles.desc]} 
                        placeholder="Descrição" 
                        onChangeText={(text)=>handleOnChangeText(text, 'desc')}/>
                    <View style={styles.btnContainer}>
                        <RoundBtn size={15} antIconName='check' onPress={(handleSubmit)}/>
                        {title.trim() || author.trim() || desc.trim() ? <RoundBtn size={15} antIconName='close' onPress={closeModal}/> : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}/>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
        paddingTop: 15,
    },
    input: {
        borderBottomWidth:2,
        borderBottomColor: colors.PRIMARY,
        fontSize:20,
        color:colors.DARK,
    },
    title: {
        fontWeight: 'bold',
        height:40,
        marginBottom:15,
    },
    author: {
        height:40,
    },
    desc: {
        height:100,

    },
    modalBG:{
        flex:1,
        zIndex:-1,
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        paddingVertical: 10,
        gap:15,
    },

})

export default BookInputModal;