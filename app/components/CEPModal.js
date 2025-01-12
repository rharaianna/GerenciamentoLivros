import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../misc/colors";
import RoundBtn from "./RoundBtn";

const CEPModal = ({ visible, onClose }) => {
  const [CEP, setCEP] = useState("");
  const [dadosEndereco, setDadosEndereco] = useState(null);

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
      } else {
        setDadosEndereco(data);
        setCEP(""); // Limpa o campo após a busca
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
      console.error(error);
    }
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "CEP") setCEP(text);
  };

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (!CEP.trim()) return onClose();
    else {
      console.log(CEP);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <TextInput
            value={CEP}
            style={[styles.input, styles.title]}
            placeholder="Insira CEP aqui"
            onChangeText={(text) => handleOnChangeText(text, "CEP")}
          />
          {dadosEndereco && (
            <View style={styles.infoContainer}>
              <Text style={styles.author}>
                Endereco: {dadosEndereco.logradouro}{" "}
              </Text>
              <Text style={styles.author}>Bairro: {dadosEndereco.bairro}</Text>
              <Text style={styles.author}>
                Cidade: {dadosEndereco.localidade} - {dadosEndereco.uf}
              </Text>
            </View>
          )}
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
          <View style={styles.btnContainer}>
            <RoundBtn size={15} antIconName="check" onPress={buscarCep} />
            <RoundBtn
              size={15}
              antIconName="close"
              onPress={() => {{onClose(); setCEP("");}
                
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    fontWeight: "bold",
    height: 60,
    marginBottom: 15,
  },
  author: {
    height: 40,
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 15,
  },
  infoContainer: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.PRIMARY,
    marginBottom: 20,
  },
});

export default CEPModal;
