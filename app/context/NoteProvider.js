import React, { createContext, useContext, useState } from 'react';

// Criar o contexto
const BookContext = createContext();

// Provider para gerenciar os livros
const NoteProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    // Função findBooks
    const findBooks = async () => {
        try {
            const response = await fetch('http://192.168.1.115:3000/books');
            if (response.ok) {
                const fetchedBooks = await response.json();
                setBooks(fetchedBooks);
            } else {
                console.error('Erro ao buscar livros:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    return (
        <BookContext.Provider value={{ books, setBooks, findBooks }}>
            {children}
        </BookContext.Provider>
    );
};

// Hook customizado para usar o contexto
export const useBooks = () => useContext(BookContext);

export default NoteProvider;
