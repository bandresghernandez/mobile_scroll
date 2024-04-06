import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: 'blue',
    marginVertical: 10,
    textAlign: 'center'
  },
  listItem: {
    fontSize: 20,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  }
});

export default function App() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    // Simular la carga inicial de datos
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // Simular la carga de datos adicionales
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => ({
        id: (items.length + index).toString(),
        text: `Elemento ${items.length + index}`
      }));
      setItems([...items, ...newItems]);
    }, 1000);
  };

  const addItem = () => {
    if (newItemText.trim() !== '') {
      setItems([...items, { id: Math.random().toString(), text: newItemText }]);
      setNewItemText('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Lista de asignaturas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nueva asignatura"
          value={newItemText}
          onChangeText={text => setNewItemText(text)}
        />
        <Button title="Agregar" onPress={addItem} />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.text}</Text>
            <Button title="Eliminar" onPress={() => removeItem(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
