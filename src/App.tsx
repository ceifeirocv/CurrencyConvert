import {Formik} from 'formik';
import React, {StrictMode, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Currency = {
  name: string;
  symbol: string;
  value: number;
  flag: string;
};

function App() {
  const [quantity, setQuantity] = useState('0');
  const [convertedValue, setConvertedValue] = useState('0');

  const currencies: Currency[] = [
    {name: 'USD', symbol: '$', value: 101.39278, flag: 'us'},
    {name: 'EUR', symbol: '€', value: 110.27, flag: 'eu'},
    {name: 'GBP', symbol: '£', value: 129.70345, flag: 'gb'},
    {name: 'JPY', symbol: '¥', value: 0.64945187, flag: 'jp'},
    {name: 'CNY', symbol: '¥', value: 13.989269, flag: 'cn'},
    {name: 'KRW', symbol: '₩', value: 0.074044125, flag: 'kr'},
  ];

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

  function CurrencyCard({currency}: {currency: Currency}) {
    const flagUrl = `https://flagcdn.com/32x24/${currency.flag}.png`;
    const backgroundColor =
      currency.name === selectdCurrency.name ? '#5C5470' : '#FAF0E6';
    const color =
      currency.name === selectdCurrency.name ? '#FAF0E6' : '#5C5470';
    return (
      <TouchableOpacity
        style={[style.card, {backgroundColor}]}
        onPress={() => setSelectedCurrency(currency)}>
        <Text style={[style.currencyName, {color}]}>{currency.name}</Text>
        <Image source={{uri: flagUrl}} style={{width: 24, height: 24}} />
        <Text
          style={[style.currencyValue, {color}]}>{`${currency.value}CVE`}</Text>
      </TouchableOpacity>
    );
  }

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
        renderItem={({item}) => <CurrencyCard currency={item} />}
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
  card: {
    flexDirection: 'column',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FAF0E6',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#352F44',
    width: '33%',
    height: 80,
  },
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
  currencyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyValue: {
    fontSize: 12,
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
