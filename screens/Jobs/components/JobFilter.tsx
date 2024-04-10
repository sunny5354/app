import React, { useState } from "react";
import { View, Modal, Platform, Switch, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";


// Custom Imports

import { FilterModalProps } from "../../../types/Modal";
import Typography from "../../../components/Typography/Typography";
import { cn } from "../../../lib/cn";
import BackHeader from "../../../components/Headers/BackHeader";
import Input from "../../../components/Input";
import DateTimePickers from "../../../components/DateTimePicker";
import FilterButtons from "../../../components/BottomButton/FilterButtons";
import colors from "../../../config/colors";
import { FilterOptionsProps } from "../../../types/jobs";
import Tab from "../../../components/TabButton";


const jobTypeData = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Not Applied", value: "not-applied" }
]



const JobFilterModal: React.FC<FilterModalProps> = ({
  modalVisible,
  handleApply,
  handleReset,
  handleModalVisible,
  ...otherProps
}) => {

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isStartDateButtonClicked, setIsStartDateButtonClicked] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [isEndDateButtonClicked, setIsEndDateButtonClicked] = useState(false);
  const [payRate, setPayRate] = useState(0);
  const [jobType, setJobType] = useState<string>("all");


  const handleDateChange = (selectedDate: any, type: "start" | "end") => {
    const date = new Date(selectedDate.nativeEvent.timestamp);
    if (type === "start") {
      setStartDate(date);
      setIsStartDateButtonClicked(true);
    }
    if (type === 'end') {
      setEndDate(date)
      setIsEndDateButtonClicked(true);
    }
  };

  const [isInternal, setIsInternal] = useState(false);

  const toggleSwitch = () => {
    setIsInternal((previousState) => !previousState);
  };

  const applyFilter = async () => {
    const obj: FilterOptionsProps = {
      location: location,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      isInternal: isInternal,
      minPayRate: payRate,
      applied: jobType
    }
    if (location === "") delete obj.location;
    if (!isStartDateButtonClicked) delete obj.startDate;
    if (!isEndDateButtonClicked) delete obj.endDate;
    if (payRate === 0) delete obj.minPayRate;
    // if (jobType === "all") delete obj.applied;
    handleApply(obj);
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleModalVisible();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
      {...otherProps}
    >
      <View
        className={cn(
          `flex-1 rounded-none overflow-hidden`,
          Platform.OS === 'ios' ? "mt-12 mb-3" : "mt-1"
        )}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}
      >
        <View className="flex-1 bg-white w-full">
          <BackHeader
            title="Jobs Filter"
            handlePress={handleModalVisible}
          />
          <ScrollView>
            <View className="flex-1 bg-white w-full p-4 mb-20" style={{ gap: 25 }}>
              <View className='h-10'>
                <Tab
                  data={jobTypeData}
                  selectedValue={jobType}
                  setSelectedValue={setJobType}
                />
              </View>
              <View className="">
                <Typography class="text-primaryGreen">Location</Typography>
                <Input placeholder="Enter your location" />
              </View>
              <View className="h-24" style={{ gap: 10 }}>
                <Typography class="text-primaryGreen">Jobs Date Range</Typography>
                <View className="flex-1 flex-row justify-between" style={{ gap: 10 }}>
                  <View className="flex-1">
                    <DateTimePickers
                      date={startDate}
                      onChange={(e) => { handleDateChange(e, 'start') }}
                      title="Start Date"
                    />
                  </View>
                  <View className="flex-1">
                    <DateTimePickers
                      date={endDate}
                      onChange={(e) => { handleDateChange(e, "end") }}
                      title="End Date"
                    />
                  </View>
                </View>
              </View>
              <View>
                <Typography class="text-primaryGreen">Pay Range</Typography>
                <Slider
                  style={{ height: 40 }}
                  minimumValue={0}
                  maximumValue={1000}
                  step={1}
                  value={payRate}
                  minimumTrackTintColor={colors.primaryGreen}
                  maximumTrackTintColor={colors.primaryGreen}
                  thumbTintColor={colors.primaryGreen}
                  onValueChange={(e) => {
                    setPayRate(e);
                  }}
                />
                <View>
                  <Typography class="text-center" variant="sm">Minimum of ${payRate.toFixed(2)} / Visit</Typography>
                </View>
              </View>
              <View>
                <Typography class="text-primaryGreen">Visit Type</Typography>
                <View className=' flex-row justify-center items-center p-4 rounded-xl' style={{ gap: 25 }}>
                  <Typography class={cn(isInternal ? 'font-Poppins' : 'font-PoppinsMedium text-primaryGreen')}>External</Typography>
                  <Switch
                    trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
                    thumbColor={isInternal ? '#7297F7' : '#FD8A94'}
                    ios_backgroundColor="#D9D9D9"
                    onValueChange={toggleSwitch}
                    value={isInternal}
                  />
                  <Typography class={cn(!isInternal ? 'font-Poppins' : 'font-PoppinsMedium text-primaryGreen')}>Internal</Typography>
                </View>
              </View>
            </View>
          </ScrollView>
          <FilterButtons
            handlePress1={() => {
              applyFilter()
            }}
            handlePress2={() => {
              handleReset();
              setIsEndDateButtonClicked(false);
              setIsStartDateButtonClicked(false);
            }}
          />
        </View>
      </View>
    </Modal >
  );
};

export default JobFilterModal;