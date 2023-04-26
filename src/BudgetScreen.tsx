import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class BudgetScreen extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <div style={styles.topValues}>
          <div style={styles.topValuesDiv}>
            <h5>This Month's Budget</h5>
            <h1>$1,000,000</h1>
          </div>
          <div style={styles.topValuesDiv}>
            <h5>Money Spent</h5>
            <h1>$1,000,000</h1>
          </div>
          <Text>Budgeting Nope</Text>
        </div>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topValues: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topValuesDiv: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
});

export default BudgetScreen;
