import Ionicons from '@expo/vector-icons/Ionicons';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { windowWidth } from './UtilComps';

type BudgetItem = {
  what: string,
  //amount: number,
  amount: string,
};

type BudgetScreenState = {
  searchText: string,
  items: BudgetItem[],
};

class BudgetScreen extends React.Component<{}, BudgetScreenState> {
  state: BudgetScreenState = {
    searchText: "",
    items: [
      { what: "3 Lottery Tickets", amount: "6.00" },
      { what: "Pay Back A Friend", amount: "50.00" },
      { what: "Concert Ticket for the Worst Seat", amount: "400.00" },
      { what: "1500 More Lottery Tickets", amount: "3,000.00" },
      { what: "1 Carton of Eggs", amount: "20,000.00" },
      { what: "Investment in FinanceLit", amount: "100,000.00" },
    ],
  };
  render() {
    return (
      <View style={styles.view}>
        <View style={styles.budgetValuesView}>
          <View style={styles.budgetValueView}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>This Month's Budget</Text>
            <Text style={{ fontWeight: "bold", fontSize: 40 }}>$1,000,000</Text>
          </View>
          <View style={[styles.budgetValueView, {}]}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>Money Spent</Text>
            <Text style={{ fontWeight: "bold", fontSize: 40 }}>$123,456</Text>
          </View>
        </View>
        <View style={[styles.searchBar, { flexDirection: "row" }]}>
          <Ionicons name="search" size={25} color="#cccccc" />
          <TextInput
            value={this.state.searchText}
            style={{ flex: 1 }}
            placeholder="Search"
            onChangeText={this.changeSearchText}
            returnKeyType="search"
          />
        </View>
        <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
          {this.state.items.filter(this.itemsFilter).map(this.itemsMap)}
        </KeyboardAwareScrollView>
      </View>
    );
  }
  itemsFilter = (item: BudgetItem) => {
    const searchLower = this.state.searchText.toLowerCase();
    return item.what.toLowerCase().indexOf(searchLower) != -1 ||
      item.amount.indexOf(searchLower) != -1
  }
  itemsMap = (item: BudgetItem, index: number): ReactElement => {
    return (
      <View key={index}>
        <View style={{ padding: 10, }}>
          <Text style={{ fontWeight: "bold", marginBottom: 2, }}>{item.what}</Text>
          <Text style={{ color: "#808080", marginBottom: 2, }}>{"$" + item.amount}</Text>
        </View>
        <View
          style={{
            borderBottomColor: "#808080",
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: windowWidth * 0.9,
          }}
        />
      </View>
    );
  }
  changeSearchText = (text: string) => {
    this.setState(state => ({
      ...state,
      searchText: text,
    }));
  };
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  budgetValuesView: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  budgetValueView: {
    //backgroundColor: "#fff",
    width: windowWidth * 0.85,
    margin: 8,
    paddingLeft: 5,
    paddingVertical: 5,

    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchBar: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
  },
});

export default BudgetScreen;
