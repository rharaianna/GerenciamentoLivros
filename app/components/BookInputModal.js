import React, { useEffect, useState } from "react";
import { View, StyleSheet,StatusBar, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import colors from "../misc/colors";
import RoundBtn from "./RoundBtn";

const BookInputModal = ({visible, onClose, onSubmit, book, isEdit}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')

    async function sendForm() {
        try {
            const response = await fetch('http://192.168.0.6:3000/create', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    desc: desc,
                }),
            });
            const json = await response.json();
            console.log('Resposta do servidor:', json); // Verifique a resposta do servidor
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error); // Mostra qualquer erro
        }
    }
    
    
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

    const handleSubmit = async () => {
        if (!title.trim() && !author.trim() && !desc.trim()) return onClose();
    
        // Manipulação do formulário de edição ou criação
        if (isEdit) {
            onSubmit(title, author, desc, Date.now());
        } else {
            onSubmit(title, author, desc);
            setTitle('');
            setAuthor('');
            setDesc('');
        }
    
        try {
            // Aguarda o envio do formulário
            await sendForm();
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
        } finally {
            // Sempre chama onClose após o envio ou falha
            onClose();
        }
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
            <Modal visible={visible} animationType='slide'> 
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
                        <RoundBtn size={15} antIconName="check" onPress={() => { handleSubmit()}} />
                        {title.trim() || author.trim() || desc.trim() ? <RoundBtn size={15} antIconName='close' onPress={closeModal}/> : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalBG:{
        flex: 1,
        zIndex:-1,
        backgroundColor:'white',
    },
    container: {
        flex:1,
        paddingHorizontal:20,
        paddingTop: 20,
    },
    input: {
        borderBottomWidth:2,
        borderBottomColor: colors.PRIMARY,
        fontSize:20,
        color:colors.DARK,
    },
    title: {
        fontWeight: 'bold',
        height:60,
        marginBottom:15,
    },
    author: {
        height:60,
    },
    desc: {
        height:120,

    },
    btnContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        paddingVertical: 10,
        gap:15,
    },

})

export default BookInputModal;