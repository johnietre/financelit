import React from 'react';
import { PropsWithChildren } from 'react';
import { Dimensions, Keyboard, Text, TouchableWithoutFeedback } from 'react-native';

const defaultFontSize = 16;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class Header1 extends React.Component<PropsWithChildren> {
  render() {
    return (
      <Text style={{
        fontSize: defaultFontSize * 2,
        fontWeight: "bold",
        marginVertical: defaultFontSize * 0.67,
      }}>{this.props.children}</Text>
    )
  }
}

class Header2 extends React.Component<PropsWithChildren> {
  render() {
    return (
      <Text style={{
        fontSize: defaultFontSize * 1.5,
        fontWeight: "bold",
        marginVertical: defaultFontSize * 0.83,
      }}>{this.props.children}</Text>
    )
  }
}

class Header3 extends React.Component<PropsWithChildren> {
  render() {
    return (
      <Text style={{
        fontSize: defaultFontSize * 1.17,
        fontWeight: "bold",
        marginVertical: defaultFontSize,
      }}>{this.props.children}</Text>
    )
  }
}

class Header4 extends React.Component<PropsWithChildren> {
  render() {
    return (
      <Text style={{
        fontSize: defaultFontSize,
        fontWeight: "bold",
        marginVertical: defaultFontSize * 1.33,
      }}>{this.props.children}</Text>
    )
  }
}

class Header5 extends React.Component<PropsWithChildren> {
  render() {
    return (
      <Text style={{
        fontSize: defaultFontSize * 0.83,
        fontWeight: "bold",
        marginVertical: defaultFontSize * 1.67,
      }}>{this.props.children}</Text>
    )
  }
}

type HideKeyboardAreaProps = {
  style?: object,
};

class HideKeyboardArea extends React.Component<PropsWithChildren<HideKeyboardAreaProps>> {
  render() {
    return (
      <TouchableWithoutFeedback style={this.props.style} onPress={() => this.disableKeyboard()}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
  disableKeyboard() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  }
}

export { Header1, Header2, Header3, Header4, Header5, HideKeyboardArea, windowHeight, windowWidth };