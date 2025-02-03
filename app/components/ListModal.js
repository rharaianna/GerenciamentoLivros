import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import RoundBtn from "./RoundBtn";
import colors from "../misc/colors";

const ListModal = ({ visible, onClose }) => {
  const BASE_URL = "http://192.168.1.115:8080/mavenproject1/resources/javaee8";

  const [livros, setLivros] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [livroEditando, setLivroEditando] = useState(null);
  const [novoLivro, setNovoLivro] = useState({ titulo: "", autor: "", desc: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      verLivros();
    }
  }, [visible]);

  const verLivros = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/todos`, { method: "GET" });
      if (!response.ok) throw new Error("Erro ao buscar os dados.");

      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarLivro = async (livro) => {
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livro),
      });
      if (!response.ok) throw new Error("Erro ao adicionar o livro.");

      setNovoLivro({ titulo: "", autor: "", desc: "" });
      verLivros();
      return "Livro adicionado com sucesso!";
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  const handleAddLivro = async () => {
    if (!novoLivro.titulo || !novoLivro.autor) {
      alert("Preencha todos os campos!");
      return;
    }

    await adicionarLivro(novoLivro);
  };

  const handleOnDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/del/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao deletar o livro.");

      verLivros();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  const setOnEdit = (livro) => {
    setLivroEditando(livro);
    setNovoLivro({ ...livro });
    setIsEditing(true);
  };

  const handleOnEdit = async () => {
    if (!livroEditando) return;

    try {
      const response = await fetch(`${BASE_URL}/put/${livroEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLivro),
      });

      if (!response.ok) throw new Error("Erro ao editar o livro.");

      setNovoLivro({ titulo: "", autor: "", desc: "" });
      setIsEditing(false);
      setLivroEditando(null);
      verLivros();
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Adicionar/Editar Livro</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={novoLivro.titulo}
            maxLength={255}
            onChangeText={(text) => setNovoLivro((prev) => ({ ...prev, titulo: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={novoLivro.autor}
            maxLength={255}
            onChangeText={(text) => setNovoLivro((prev) => ({ ...prev, autor: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={novoLivro.desc}
            onChangeText={(text) => setNovoLivro((prev) => ({ ...prev, desc: text }))}
          />
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <RoundBtn antIconName={"check"} onPress={handleOnEdit} />
                <RoundBtn antIconName={"close"} onPress={() => {
                  setIsEditing(false);
                  setNovoLivro({ titulo: "", autor: "", desc: "" });
                }} />
              </>
            ) : (
              <RoundBtn antIconName={"plus"} onPress={handleAddLivro} />
            )}
          </View>
        </View>

        <Text style={styles.modalText}>Coleção de Livros</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        ) : (
          <ScrollView>
            {livros.length > 0 ? (
              livros.map((livro) => (
                <View key={livro.id} style={[styles.modalView, styles.itemContainer]}>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{livro.titulo}</Text>
                    <Text style={styles.itemText}>{livro.autor}</Text>
                    <Text style={styles.itemText}>{livro.desc}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <RoundBtn antIconName="delete" onPress={() => handleOnDelete(livro.id)} />
                    <RoundBtn antIconName="edit" onPress={() => setOnEdit(livro)} />
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.itemText}>Nenhum livro encontrado.</Text>
            )}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    elevation: 5,
  },
  modalText: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.PRIMARY,
  },
  itemText: {
    marginBottom: 10,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.PRIMARY,
    marginBottom: 10,
    padding: 5,
  },
});

export default ListModal;
