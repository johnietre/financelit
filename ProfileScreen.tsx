import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { HideKeyboardArea, Header3, windowWidth } from './UtilComps';

type ProfileScreenState = {
  name: string,
  email: string,
  msgShowing: boolean,
};

class ProfileScreen extends React.Component<{}, ProfileScreenState> {
  state: ProfileScreenState = {
    name: "",
    email: "",
    msgShowing: false,
  };
  render() {
    return (
      <HideKeyboardArea>
        <View style={styles.formView}>
          <Header3>Register</Header3>
          <View style={styles.formFieldView}>
            <Text style={styles.formFieldLabel}>Name</Text>
            <TextInput
              value={this.state.name}
              placeholder="Name"
              onChangeText={this.changeName}
              returnKeyType="done"
              style={styles.formFieldInput} />
          </View>
          <View style={styles.formFieldView}>
            <Text style={styles.formFieldLabel}>Email</Text>
            <TextInput
              value={this.state.email}
              placeholder="Email"
              onChangeText={this.changeEmail}
              autoComplete="email"
              autoCapitalize="none"
              keyboardType="email-address"
              inputMode="email"
              textContentType="emailAddress"
              returnKeyType="done"
              style={styles.formFieldInput} />
          </View>
          <Pressable
            onPress={this.doSubmit}
            disabled={this.submitDisabled()}
            style={styles.formSubmit}>
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          </Pressable>
          {
            this.state.msgShowing && <Text style={{ color: "red" }}>Not implemented yet</Text>
          }
        </View>
      </HideKeyboardArea>
    );
  }
  changeName = (text: string) => {
    this.setState(state => ({
      ...state,
      name: text,
    }));
  }
  changeEmail = (text: string) => {
    this.setState(state => ({
      ...state,
      email: text,
    }));
  }
  submitDisabled = () => {
    return this.state.name == "" || this.state.email == "";
  }
  doSubmit = () => {
    this.setState(state => ({
      ...state,
      msgShowing: true,
    }));
  }
}

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  formFieldView: {
    margin: 10,
  },
  formFieldLabel: {
    fontWeight: "bold",
    margin: 5,
  },
  formFieldInput: {
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth * 0.8,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 20,
  },
  formSubmit: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#45ab43",
    borderRadius: 5,
  },
});

export default ProfileScreen;