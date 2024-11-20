import React, { useState } from "react";
import { View, Modal, Platform } from "react-native";


// Custom Imports

import { FilterModalProps } from "../../../types/Modal";
import Typography from "../../../components/Typography/Typography";
import { cn } from "../../../lib/cn";
import BackHeader from "../../../components/Headers/BackHeader";
import Input from "../../../components/Input";
import DateTimePickers from "../../../components/DateTimePicker";
import FilterButtons from "../../../components/BottomButton/FilterButtons";
import { JobTypeFilterOptionProps } from "../../../types/jobs";
import Tab from "../../../components/TabButton";


const jobTypeData = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "In Progress", value: "Inprogress" }
]



const JobTypeFilterModal: React.FC<FilterModalProps> = ({
  modalVisible,
  handleApply,
  handleReset,
  handleModalVisible,
  ...otherProps
}) => {

  const [agencyName, setAgencyName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isStartDateButtonClicked, setIsStartDateButtonClicked] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [isEndDateButtonClicked, setIsEndDateButtonClicked] = useState(false);
  const [jobType, setJobType] = useState<string>("Pending");


  const handleDateChange = (selectedDate: any, type: "start" | "end") => {
    const date = new Date(selectedDate.nativeEvent.timestamp);
    if (type === "start") {
      setStartDate(date)
      setIsStartDateButtonClicked(true)
    }
    if (type === 'end') {
      setEndDate(date)
      setIsEndDateButtonClicked(true)
    }
  };

  const applyFilter = async () => {
    const obj: JobTypeFilterOptionProps = {
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      agencyName: agencyName,
      qaStatus: jobType
    }
    if (agencyName === "") delete obj.agencyName;
    if (!isStartDateButtonClicked) delete obj.startDate;
    if (!isEndDateButtonClicked) delete obj.endDate;

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
          <View className="flex-1 bg-white w-full p-4" style={{ gap: 25 }}>
            <View className="">
              <Typography class="text-primaryGreen">Agency Name</Typography>
              <Input placeholder="Agency Name" />
            </View>
            <View className="h-24" style={{ gap: 10 }}>
              <Typography class="text-primaryGreen">Date Range</Typography>
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
            <View style={{ gap: 10 }}>
              <Typography class="text-primaryGreen">QA Status</Typography>
              <View className='h-10'>
                <Tab
                  data={jobTypeData}
                  selectedValue={jobType}
                  setSelectedValue={setJobType}
                />
              </View>
            </View>
          </View>
          <FilterButtons
            handlePress1={applyFilter}
            handlePress2={() => {
              handleReset();
              setAgencyName("");
              setStartDate(new Date());
              setEndDate(new Date());
              setJobType("Pending");
              setIsStartDateButtonClicked(false);
              setIsEndDateButtonClicked(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default JobTypeFilterModal;