import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Hello PetShop</Text>
        <Text style={{ marginTop: 8, color: '#666' }}>Render simples para validar o build web.</Text>
      </View>
    </SafeAreaView>
  );
}

