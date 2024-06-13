import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Provider as PaperProvider, Card, Title, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = Constants.expoConfig.extra;

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/cats`);
      const newImages = response.data.map((img: { url: string }) => img.url);
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#ff9a9e', '#fad0c4']}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <Title style={styles.title}>Cat Gallery</Title>
          <Button
            mode="contained"
            onPress={fetchImages}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Load More Cats'}
          </Button>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {images.map((url, index) => (
              <Card key={index} style={styles.card}>
                <Card.Cover source={{ uri: url }} style={styles.image} />
              </Card>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    marginBottom: 20,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
  },
  scrollView: {
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    width: 300,
  },
  image: {
    height: 300,
  },
});

export default App;
