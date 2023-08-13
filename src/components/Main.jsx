import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

export default function Main() {
  const [selectedHour, setSelectedHour] = React.useState("00");
  const [selectedMinute, setSelectedMinute] = React.useState("00");
  const [calculatedHours, setCalculatedHours] = React.useState([]);
  const [preSleepTime, setPreSleepTime] = React.useState("15");

  const calculateHours = () => {
    const startTime = new Date(0);
    startTime.setUTCHours(parseInt(selectedHour, 10));
    startTime.setUTCMinutes(
      parseInt(selectedMinute, 10) + parseInt(preSleepTime, 10)
    );

    const calculatedHours = [];

    for (let i = 1; i <= (9 / 1, 5); i++) {
      const newTime = new Date(startTime.getTime() + i * 90 * 60 * 1000);
      const formattedTime = `${newTime
        .getUTCHours()
        .toString()
        .padStart(2, "0")}:${newTime
        .getUTCMinutes()
        .toString()
        .padStart(2, "0")}`;
      calculatedHours.push(formattedTime);
    }

    setCalculatedHours(calculatedHours);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
  };
  const handlePreSlipTimechange = (minutes) => {
    setPreSleepTime(minutes);
  };

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
      }}
    >
      <Text>Pre sleep time</Text>
      <View style={styles.timePickerContainer}>
        <Picker
          selectedValue={preSleepTime}
          onValueChange={handlePreSlipTimechange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          itemTextStyle={styles.pickerText}
          mode="dropdown"
        >
          {Array.from({ length: 15 }, (_, minutes) => (
            <Picker.Item
              key={minutes}
              label={`${(minutes + 1).toString().padStart(2, "0")}`}
              value={`${(minutes + 1).toString().padStart(2, "0")}`}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.timePickerContainer}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={handleHourChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          itemTextStyle={styles.pickerText}
          mode="dropdown"
        >
          {Array.from({ length: 24 }, (_, hour) => (
            <Picker.Item
              key={hour}
              label={`${hour.toString().padStart(2, "0")}`}
              value={`${hour.toString().padStart(2, "0")}`}
            />
          ))}
        </Picker>
        <Text>:</Text>
        <Picker
          selectedValue={selectedMinute}
          onValueChange={handleMinuteChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          itemTextStyle={styles.pickerText}
          mode="dropdown"
        >
          {Array.from({ length: 60 }, (_, index) => (
            <Picker.Item
              key={index}
              label={`${index.toString().padStart(2, "0")}`}
              value={`${index.toString().padStart(2, "0")}`}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.calculatedHours}>
        {calculatedHours.map((hour) => (
          <Text style={styles.calculatedHoursText} key={hour}>
            {hour}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Calcular" style={styles.button} onPress={calculateHours}>
          Calcular
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timePickerContainer: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
  },
  picker: {
    flex: 1,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerItem: {},
  pickerText: { fontSize: 16 },
  calculatedHours: {},
  calculatedHoursText: { padding: 5, margin: 5 },
  button: {
    borderRadius: 20,
    backgroundColor: "green",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
