import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {veryDarkGrey, white, red, lightGrey, grey} from '../../theme/colors';
import InputField from '../shared/InputField/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePickerModal from '../shared/DatePickerModal/DatePickerModal';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
export default AddMovieModal = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [movieDescription, setMovieDescription] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  submitMovie = () => {
    let movie = {};
    movie.poster_path = imageUri;
    movie.userCreated = true;
    movie.title = movieTitle;
    movie.overview = movieDescription;
    movie.release_date = selectedDate;
    props.onClose();
    props.addNewMovie(movie);
    setMovieTitle(null);
    setSelectedDate(null);
    setMovieDescription(null);
    setImageUri(null);
  };

  chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'permission') {
        alert('Please allow access to Photos in settings');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setImageUri(response.uri);
    });
  };

  const enabled =
    movieTitle !== '' &&
    movieDescription !== '' &&
    movieTitle !== null &&
    movieDescription !== null &&
    selectedDate !== null;

  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.onClose}
        style={styles.modalBoxStyle}
        deviceHeight={height}
        deviceWidth={width}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
          <View style={styles.modalView}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={props.onClose}>
                <Icon name="close" size={22} color={white}></Icon>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleStyle}>Enter Movie Details</Text>
            <ScrollView
              style={styles.contentContainer}
              contentContainerStyle={styles.contentContainerStyle}>
              <TouchableOpacity
                onPress={this.chooseFile}
                style={styles.imageTouchable}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    source={
                      imageUri
                        ? {uri: imageUri}
                        : require('../../assets/images/default_poster.jpg')
                    }
                  />
                </View>
              </TouchableOpacity>
              <InputField
                value={movieTitle}
                onChangeText={setMovieTitle}
                placeholder="Movie Title"
                style={styles.movieTitleStyle}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.datePickerField}
                onPress={() => {
                  setDatePickerVisibility(true);
                }}>
                <Text
                  style={[
                    styles.dateFieldText,
                    selectedDate === null ? {color: lightGrey} : {color: white},
                  ]}>
                  {selectedDate === null ? 'Release Date' : selectedDate}
                </Text>
              </TouchableOpacity>
              <InputField
                value={movieDescription}
                onChangeText={setMovieDescription}
                placeholder="Description"
                multiline={true}
                description={true}
              />
            </ScrollView>
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                activeOpacity={enabled ? 0.2 : 1}
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: enabled ? red : lightGrey,
                  },
                ]}
                onPress={enabled ? this.submitMovie : () => {}}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DatePickerModal
            isVisible={datePickerVisibility}
            onClose={() => {
              setDatePickerVisibility(false);
            }}
            onConfirm={(date) => {
              setDatePickerVisibility(false);
              setSelectedDate(date);
            }}
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: veryDarkGrey,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.7,
    padding: 15,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
  },
  titleStyle: {
    fontSize: 24,
    color: white,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    width: 135,
    height: 150,
    marginBottom: 15,
  },
  imageStyle: {width: 135, height: '100%', resizeMode: 'contain'},
  contentContainerStyle: {alignItems: 'center', paddingTop: 10},
  movieTitleStyle: {marginBottom: 10},
  saveButtonContainer: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  saveButton: {
    padding: 15,
    width: 75,
    backgroundColor: red,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: white,
    fontSize: 16,
    fontWeight: '500',
  },
  datePickerField: {
    backgroundColor: grey,
    width: '100%',
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateFieldText: {
    fontSize: 18,
    fontWeight: '500',
  },
  imageTouchable: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
