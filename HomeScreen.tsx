import React from 'react';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header1, Header3, HideKeyboardArea, windowWidth } from './UtilComps'

type HomeScreenState = {
  showingFeedback: boolean,
};

/*
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
*/

class HomeScreen extends React.Component<{}, HomeScreenState> {
  state: HomeScreenState = {
    showingFeedback: false,
  };
  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.homeView} style={{}}>
          <View style={styles.headerView}>
            <Header1>FinanceLit</Header1>
            <Text style={{ color: "#808080" }}>Making your finances lit!</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center", padding: 15, fontSize: 20 }}>
              FinanceLit not only teaches you how to better manage your finances
              through instilling financial literacy, but also helps you practice
              these skills. With access to courses, webinars, financial advisors,
              tools, and more, take control of the present and get on the track
              to dominate your future!
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Pressable style={[styles.registerButton, styles.rfButton]}>
              <Text style={[styles.rfText, { color: "white" }]}>Register</Text>
            </Pressable>
            <Pressable onPress={this.showFeedback} style={[styles.feedbackButton, styles.rfButton]}>
              <Text style={styles.rfText}>Leave Feedback</Text>
            </Pressable>
          </View>
          {this.state.showingFeedback && <FormView />}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
  showFeedback = () => {
    this.setState(state => ({
      showingFeedback: !this.state.showingFeedback,
    }))
  }
}

const formStyles = StyleSheet.create({
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
    margin: 25,
    padding: 10,
    backgroundColor: "#45ab43",
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerView: {
    padding: 20,
  },
  buttonView: {
    flexDirection: "row",
  },
  rfButton: {
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  registerButton: {
    backgroundColor: "#45ab43",
  },
  feedbackButton: {
  },
  rfText: {
    fontWeight: "bold",
  },
  ...formStyles,
});

type FormViewState = {
  email: string,
  feedback: string,
  msgShowing: boolean,
};

class FormView extends React.Component<{}, FormViewState> {
  state: FormViewState = {
    email: "",
    feedback: "",
    msgShowing: false,
  };
  render() {
    return (
      <HideKeyboardArea>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formView}>
          <Header3>Feedback</Header3>
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
          <View style={styles.formFieldView}>
            <Text style={styles.formFieldLabel}>Feedback</Text>
            <TextInput
              value={this.state.feedback}
              placeholder="Your feedback."
              onChangeText={this.changeFeedback}
              multiline={true}
              textAlignVertical="top"
              returnKeyType="done"
              style={[styles.formFieldInput, { minHeight: 100 }]} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={this.doSubmit} disabled={this.submitDisabled()} style={styles.formSubmit}>
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </Pressable>
            <Pressable onPress={this.clearInput} style={[styles.formSubmit, { backgroundColor: "red" }]}>
              <Text style={{ color: "white", fontSize: 20 }}>Clear</Text>
            </Pressable>
          </View>
          {
            this.state.msgShowing && <Text style={{ color: "red" }}>Not implemented yet</Text>
          }
        </KeyboardAvoidingView>
      </HideKeyboardArea>
    );
  }
  changeEmail = (text: string) => {
    this.setState(state => ({
      ...state,
      email: text,
    }));
  }
  changeFeedback = (text: string) => {
    this.setState(state => ({
      ...state,
      feedback: text,
    }));
  }
  submitDisabled = () => {
    return this.state.feedback == "" || this.state.email == "";
  }
  doSubmit = () => {
    this.setState(state => ({
      ...state,
      msgShowing: true,
    }));
  }
  clearInput = () => {
    this.setState(state => ({
      email: "",
      feedback: "",
      msgShowing: false,
    }));
  }
}

export default HomeScreen;