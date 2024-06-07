import {Dispatch, SetStateAction} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface CurrencyCardProps {
  currency: Currency;
  selectedCurrency: Currency;
  setSelectedCurrency: (
    currency: Currency | ((prevCurrency: Currency) => Currency),
  ) => void;
}

export function CurrencyCard({
  currency,
  selectedCurrency,
  setSelectedCurrency,
}: CurrencyCardProps) {
  const flagUrl = `https://flagcdn.com/32x24/${currency.flag}.png`;
  const backgroundColor =
    currency.name === selectedCurrency.name ? '#5C5470' : '#FAF0E6';
  const color = currency.name === selectedCurrency.name ? '#FAF0E6' : '#5C5470';
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
  currencyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyValue: {
    fontSize: 12,
  },
});
