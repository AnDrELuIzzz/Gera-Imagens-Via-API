import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Pressable, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [catImages, setCatImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCatImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:3000/api/cats');
      const images = response.data.map((cat: any) => cat.url);
      setCatImages([...catImages, ...images]);
    } catch (error) {
      console.error("Erro ao pegar imagens: ", error);
      setError("Oops! Algo deu errado. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const clearImages = () => {
    setCatImages([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Galeria de Gatos</Text>
      </View>
      <Pressable onPress={fetchCatImages} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Obter Imagens</Text>
        )}
      </Pressable>
      <Pressable onPress={clearImages} style={styles.clearButton}>
        <Text style={styles.buttonText}>Limpar Imagens</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView style={styles.scrollView}>
        {catImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F496D',
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#2D3250',
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#3E7E6F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#E46E6E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default App;
