import React, { createContext,useContext,useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookContext = createContext()

const NoteProvider = ({children}) => {
    const [books, setBooks] = useState([])
    
    const findBooks = async () => {
        const result = await AsyncStorage.getItem('books');
        if (result!==null) setBooks(JSON.parse(result));
    }

    useEffect(()=>{
        findBooks();
    },[]);

    return(
        <BookContext.Provider value={{books, setBooks, findBooks}}>
            {children}
            
        </BookContext.Provider>
    )
}

export const useBooks = () => useContext(BookContext)

export default NoteProvider;
