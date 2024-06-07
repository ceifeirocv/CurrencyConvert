import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {currencies} from './constants';
import {CurrencyCard} from './components/CurrencyCard';

function App() {
  const [quantity, setQuantity] = useState('0');
  const [convertedValue, setConvertedValue] = useState('0');

  const [selectdCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0],
  );

  useEffect(() => {
    setConvertedValue(
      (
        Math.round(Number(quantity) * selectdCurrency.value * 100) / 100
      ).toString(),
    );
  }, [quantity, selectdCurrency]);

  return (
    <View style={{flex: 1, backgroundColor: '#352F44'}}>
      <View style={style.convertedCard}>
        <Text style={style.convertedText}>{`${convertedValue} CVE`}</Text>
      </View>
      <View style={style.inputContainer}>
        <TextInput
          keyboardType="numeric"
          style={style.input}
          autoFocus
          numberOfLines={1}
          placeholder="Ex. 100.00"
          value={quantity}
          onChangeText={setQuantity}
        />
        <Text style={style.inputCurrency}>{selectdCurrency.name}</Text>
      </View>
      <FlatList
        data={currencies}
        renderItem={({item}) => (
          <CurrencyCard
            currency={item}
            selectedCurrency={selectdCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        )}
        keyExtractor={item => item.name}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginHorizontal: 8,
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  convertedCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
  },
  convertedText: {
    color: '#FAF0E6',
    fontWeight: 'bold',
    fontSize: 44,
  },

  input: {
    height: 48,
    margin: 8,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#FAF0E6',
    textAlign: 'right',
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 8,
    alignItems: 'center',
  },
  inputCurrency: {color: '#FAF0E6', fontWeight: 'bold', fontSize: 32},
});

export default App;
