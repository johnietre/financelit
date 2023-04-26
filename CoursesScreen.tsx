import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Dimensions, Image, ImageBackground, ScrollView,
  StyleSheet, Text, TextInput, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HideKeyboardArea, windowHeight, windowWidth } from "./UtilComps";

type Course = {
  name: string,
  desc: string,
  image: any,
};

const courses: Course[] = [
  { "name": "Budgeting", "desc": "Capture The Present", "image": { "uri": "https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fjcsbalt.org%2Fwp-content%2Fuploads%2F2022%2F02%2FBlog-cover-images-33-e1644520710429.png" } },
  { "name": "Saving", "desc": "Protect Your Future", "image": { "uri": "https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fst2.depositphotos.com%2F3390741%2F5560%2Fv%2F950%2Fdepositphotos_55601123-stock-illustration-cartoon-cute-piggy-bank-with.jpg" } },
  { "name": "Investing", "desc": "Expand Your Future", "image": { "uri": "https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fwww.investopedia.com%2Fthmb%2FejYdlrujyl33H3iRRvZrU2huOXs%3D%2F4200x2797%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2F4243163-v1-05dfe20436f042999666243640fd84cd.png" } },
  //{ "name": "Money", "desc": "Mo' Money, Mo' Problems, Foo", "image": { "uri": "https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fwww.investopedia.com%2Fthmb%2FejYdlrujyl33H3iRRvZrU2huOXs%3D%2F4200x2797%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2F4243163-v1-05dfe20436f042999666243640fd84cd.png" } },
];

type CourseProps = {
  name: string,
  desc: string,
  uri: string,
};

class CourseView extends React.Component<CourseProps> {
  render() {
    return (
      <View style={styles.courseView}>
        <Image style={styles.courseImage} source={{ "uri": this.props.uri }} />
        <Text style={styles.courseImageName}>{this.props.name}</Text>
        <Text style={styles.courseImageDesc}>{this.props.desc}</Text>
      </View>
    );
  }
}

type CoursesScreenProps = {};

type CoursesScreenState = {
  searchText: string,
};

class CoursesScreen extends React.Component<{}, CoursesScreenState> {
  state: CoursesScreenState = {
    searchText: "",
  };
  render() {
    return (
      <HideKeyboardArea>
        <View style={{ minHeight: windowHeight }}>
          <View style={[styles.searchBar, { flexDirection: "row" }]}>
            <Ionicons name="search" size={25} color="#808080" />
            <TextInput
              value={this.state.searchText}
              style={{ flex: 1 }}
              placeholder="Search"
              onChangeText={this.changeSearchText}
              returnKeyType="search"
            />
          </View>
          <KeyboardAwareScrollView contentContainerStyle={styles.coursesView}>
            {courses.filter(course => this.filterSerach(course)).map((course, index) =>
              <CourseView
                key={index}
                name={course.name}
                desc={course.desc}
                uri={course.image.uri} />
            )}
          </KeyboardAwareScrollView>
        </View>
      </HideKeyboardArea>
    );
  }
  changeSearchText = (text: string) => {
    this.setState(state => ({
      searchText: text,
      state
    }));
  };
  filterSerach = (course: Course): boolean => {
    const searchLower = this.state.searchText.toLowerCase();
    return course.name
      .toLowerCase()
      .indexOf(searchLower) != -1 ||
      course.desc.toLowerCase().indexOf(searchLower) != -1;
  };
}

const styles = StyleSheet.create({
  coursesView: {
    //minHeight: windowHeight,
    flexGrow: 1,
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  courseView: {
    width: windowWidth * 3 / 10,
    marginVertical: 10,
    //minHeight: windowWidth * 4 / 10,
  },
  courseImage: {
    width: windowWidth * 3 / 10,
    height: windowWidth * 3 / 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  courseImageName: {
    fontWeight: "bold",
  },
  courseImageDesc: {
    color: "#808080",
  },
  searchBar: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 5,
  },
});

export default CoursesScreen;