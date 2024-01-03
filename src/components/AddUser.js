import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UseContext} from './UseContext';
import Icon from 'react-native-vector-icons/AntDesign';
const screenHeight = Dimensions.get('window').height;
const AddUser = () => {
  const {userData, setUserData} = useContext(UseContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    console.log('Input Value:', inputValue);
    setUserData(prev => {
      return [...prev, {id: userData.length + 1, 'Column 1': inputValue}];
    });
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Button title="Add user" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="closecircleo" size={20} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalHeader}>Add User</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    maxHeight: screenHeight * 0.8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default AddUser;
