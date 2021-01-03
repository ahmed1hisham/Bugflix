import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {white, red, lightGrey} from '../../theme/colors';
import InputField from '../shared/InputField/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePickerModal from '../shared/DatePickerModal/DatePickerModal';
import {launchImageLibrary} from 'react-native-image-picker';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');
export default AddMovieModal = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [movieDescription, setMovieDescription] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const submitMovie = () => {
    let movie = {};
    movie.poster_path = imageUri;
    movie.userCreated = true;
    movie.title = movieTitle;
    movie.overview = movieDescription;
    movie.release_date = selectedDate;
    props.onClose();
    props.addNewMovie(movie);
    resetModal();
  };

  const chooseFile = () => {
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

  const resetModal = () => {
    setMovieTitle(null);
    setSelectedDate(null);
    setMovieDescription(null);
    setImageUri(null);
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
        onBackdropPress={() => {
          props.onClose();
          resetModal();
        }}
        style={styles.modalBoxStyle}
        deviceHeight={height}
        deviceWidth={width}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
          <View style={styles.modalView}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.onClose();
                  resetModal();
                }}>
                <Icon name="close" size={22} color={white}></Icon>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleStyle}>Enter Movie Details</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.contentContainer}
              contentContainerStyle={styles.contentContainerStyle}>
              <TouchableOpacity
                onPress={chooseFile}
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
                onPress={enabled ? submitMovie : () => {}}>
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
