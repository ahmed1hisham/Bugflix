import React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {format} from 'date-fns';
import {styles} from './styles';
import {veryDarkGrey, white} from '../../../theme/colors';

const {width, height} = Dimensions.get('window');

export default DatePickerModal = (props) => {
  const [date, setDate] = useState(new Date());
  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={() => {
          props.onClose();
        }}
        style={styles.modalBoxStyle}
        deviceHeight={height}
        deviceWidth={width}>
        <View style={styles.modalView}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            textColor={white}
            androidVariant="iosClone"
            fadeToColor={veryDarkGrey}
          />
          <View style={styles.doneButtonContainer}>
            <Text
              style={styles.doneButtonText}
              onPress={() => {
                props.onConfirm(format(date, 'MMM do ,yyyy'));
              }}>
              Done
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
