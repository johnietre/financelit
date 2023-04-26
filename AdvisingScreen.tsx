import Ionicons from '@expo/vector-icons/Ionicons';
import { ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import React, { ReactElement } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HideKeyboardArea } from "./UtilComps";

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

type AdvisingScreenState = {
  input: string,
  messages: ChatCompletionResponseMessage[],
  errMsg: string,
  isLoading: boolean,
  chatEnabled: boolean,
};

interface ScrollPropI {
  scrollToEnd?: (object),
};

class AdvisingScreen extends React.Component<{}, AdvisingScreenState> {
  state: AdvisingScreenState = {
    input: "",
    messages: [],
    errMsg: "",
    isLoading: false,
    chatEnabled: false,
  };
  //private scrollRef = React.createRef<KeyboardAwareScrollView>();
  // Check if this is good
  //private scrollRef = React.createRef<KeyboardAwareScrollView>();
  private scrollRef: ScrollPropI = {};
  render() {
    return (
      <HideKeyboardArea>
        <View style={{ flex: 1 }}>
          <Text style={styles.disclaimerText}>
            DISCLAIMER:{"\n"}ChatGPT CAN BE WRONG!{"\n"}USE WITH CAUTION!
          </Text>
          <View style={styles.chatInputView}>
            <Pressable style={styles.resetButton} onPress={this.resetState}>
              <Text style={{ color: "white" }}>Reset</Text>
            </Pressable>
            <TextInput
              value={this.state.input}
              onChangeText={this.changeInputText}
              placeholder="Message"
              style={styles.chatInput} />
            <Pressable onPress={() => this.sendMsg()}>
              <Ionicons name="send" size={50} color="black" />
            </Pressable>
          </View>
          <Text style={{ color: "red" }}>{this.state.errMsg}</Text>
          <KeyboardAwareScrollView
            style={styles.chatMsgsView}
            innerRef={this.getScrollRef}
          >
            {this.state.isLoading && <ActivityIndicator />}
            <View>
              {this.state.messages.map(mapMsg)}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </HideKeyboardArea>
    );
  }
  getScrollRef = (ref: any) => {
    this.scrollRef = ref;
  }
  resetState = () => {
    this.setState(() => ({
      input: "",
      messages: [],
      errMsg: "",
      isLoading: false,
      chatEnabled: false,
    }));
  }
  changeInputText = (text: string) => {
    this.setState(state => ({
      ...state,
      input: text,
    }));
  }
  async sendMsg() {
    if (!this.state.chatEnabled) {
      if (this.state.input.toLowerCase() === "johnie") {
        this.setState(state => ({
          ...state,
          input: "",
          chatEnabled: true,
        }));
      }
      return;
    }
    const messages = this.state.messages;
    messages.push({
      role: "user",
      content: this.state.input,
    })
    this.setState(state => ({
      ...state,
      isLoading: true,
    }));
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.1,
      })
      if (response.status != 200) {
        this.setState(state => ({
          ...state,
          errMsg: response.statusText + "\n" + response.data,
        }));
      }
      messages.push(response.data.choices[0].message!);
      this.setState(state => ({
        ...state,
        isLoading: false,
        messages: messages,
      }));
      if (typeof this.scrollRef.scrollToEnd === "function") {
        this.scrollRef.scrollToEnd({ animated: true });
      }
    } catch (error) {
      this.setState(state => ({
        ...state,
        isLoading: false,
        errMsg: `${error}`,
      }));
    }
  }
}

function mapMsg(msg: ChatCompletionResponseMessage, index: number): ReactElement {
  if (msg.role == "user") {
    return (<Text key={index} style={{ textAlign: "left", marginRight: 10 }}>{msg.content}</Text>);
  }
  return (
    <Text key={index} style={{ textAlign: "right", marginLeft: 10, color: "green" }}>{msg.content}</Text>
  );
}

type ChatGPTMessage = {
  role: "system" | "user" | "assistant",
  content: string,
  name?: string,
};

async function sendToGPT(msgs: ChatCompletionResponseMessage[]): Promise<CreateChatCompletionResponse> {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: msgs,
    temperature: 0.1,
  });
  return completion.data;
}

const styles = StyleSheet.create({
  disclaimerText: {
    color: "#f48424",
    textAlign: "center",
  },
  chatInputView: {
    flexDirection: "row",
  },
  chatInput: {
    flex: 1,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    marginRight: 2,
  },
  resetButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  chatMsgsView: {
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
});

export default AdvisingScreen;
