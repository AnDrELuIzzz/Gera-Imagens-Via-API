import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Image, View } from 'react-native';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cats');
      const newImages = response.data.map((img: { url: string }) => img.url);
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error(error);
    }
  };

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollView: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default App;
