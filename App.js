import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';
import { Picker } from './src/components/Picker';
import api from './src/services/api'



export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [convertido, setConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all')

      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setMoedas(arrayMoedas)
      setLoading(false)
    }
    loadMoedas()
  }, [])

  async function converter() {
    if (moedaSelecionada === null || moedaBValor === 0) {
      alert("Selecione uma moeda.");
      return;
    }
    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    // console.log(response.data[moedaSelecionada].ask)

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setConvertido(`R$ ${resultado.toFixed(2)}`)
    setValorMoeda(moedaBValor)

    //FECHADO O TECLADO
    Keyboard.dismiss();

  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator
          color={'#fff'}
          size={45}
        />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)} />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput
            placeholder='EX: 150'
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>

        <TouchableOpacity style={styles.botoaArea} onPress={converter}>
          <Text style={styles.botaoTexto}>converter</Text>
        </TouchableOpacity>

        {convertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>{valorMoeda} {moedaSelecionada}</Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>Corresponde a</Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>{convertido}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
    alignItems: 'center',
    paddingTop: 40,
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },
  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingBottom: 9,
    paddingTop: 9,
    marginBottom: 1,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  botoaArea: {
    width: '90%',
    backgroundColor: 'purple',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  valorConvertido: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000'
  }
});
