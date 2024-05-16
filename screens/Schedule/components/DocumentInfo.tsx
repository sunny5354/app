import React, { useEffect, useState } from "react";
import { View, Modal, Platform, Image, ScrollView, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";


// Custom Imports

import { LogMileageModalProps } from "../../../types/Modal";
import Typography from "../../../components/Typography/Typography";
import { cn } from "../../../lib/cn";
import BackHeader from "../../../components/Headers/BackHeader";
import Input from "../../../components/Input";
import DateTimePickers from "../../../components/DateTimePicker";
import SingleBottomButton from "../../../components/BottomButton/SingleBottomButton";
import TextArea from "../../../components/Input/TextArea";
import Button from "../../../components/Button";

import { backgroundShadow } from "../../../components/backgroundShadow";
import { imagePdfFileTypeProps } from "../../../types/types";
import { LogMileageProps } from "../../../types/jobs";
import TimePicker from "../../../components/DateTimePicker/TimePicker";
import ClientSignatureModal from "../../PointOfCare/components/ClientSignature";



const DocumentInfo: React.FC<LogMileageModalProps> = ({
  data,
  modalVisible,
  handleSubmit,
  handleModalVisible,
  ...otherProps
}) => {


  const [signature, setSignature] = useState<imagePdfFileTypeProps | null>(null);
  const [timeIn, setTimeIn] = useState(new Date());
  const [inTime, setInTime] = useState<string>(new Date().toTimeString());
  const [timeOut, setTimeOut] = useState(new Date());
  const [outTime, setOutTime] = useState<string>(new Date().toTimeString());
  const [clientSignatureModal, setClientSignatureModal] = useState(false);

  const handleConfirm = (str: string, event: "In" | "Out") => {
    if (event === "In") {
      setInTime(str);
    }
    if (event === "Out") {
      setOutTime(str);
    }
  };

  const handleDateChange = (selectedDate: any, type: "start" | "end") => {
    const date = new Date(selectedDate.nativeEvent.timestamp);
    if (type === "start") {
      setTimeIn(date);
    }
    if (type === 'end') {
      setTimeOut(date)
    }
  };

  const formik = useFormik({
    initialValues: {
      associateMileage: "",
      notes: ""
    },
    validationSchema: yup.object({
      associateMileage: yup.string().required(),
      notes: yup.string().required()
    }),
    onSubmit: async (values) => {
      if (!signature) {
        alert("Please collect signature");
        return;
      }
      const obj: LogMileageProps = {
        inDate: timeIn.toString(),
        outDate: timeOut.toString(),
        mileage: values.associateMileage,
        notes: values.notes,
        patientSignature: signature?._id,
        inTime: inTime,
        outTime: outTime
      }
      handleSubmit(obj);
      handleModalVisible();
    }
  })


  useEffect(() => {
    if (data) {
      formik.setValues({
        associateMileage: data.mileage,
        notes: data.notes
      })
      setSignature(data.patientSignature);
      setTimeIn(new Date(data.inDate));
      setTimeOut(new Date(data.outDate));
      setInTime(data.inTime);
      setOutTime(data.outTime);
    }
    else {
      setSignature(null);
      setTimeIn(new Date());
      setTimeOut(new Date());
      setInTime(new Date().toTimeString().slice(0, 5))
      setOutTime(new Date().toTimeString().slice(0, 5))
      formik.resetForm();
    }
  }, [modalVisible])

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
            title="Log Mileage"
            handlePress={handleModalVisible}
          />
          <ScrollView>
            <View className="flex-1 bg-white w-full p-4" style={{ gap: 25 }}>
              <View className="h-24" style={{ gap: 10 }}>
                <Typography class="text-primaryGreen">Time In</Typography>
                <View className="flex-1 flex-row justify-between" style={{ gap: 10 }}>
                  <View className="flex-1">
                    <DateTimePickers
                      date={timeIn}
                      onChange={(e) => { handleDateChange(e, 'start') }}
                      title="Date"
                    />
                  </View>
                  <View className="flex-1">
                    <TimePicker
                      time={inTime}
                      onChange={(e) => { handleConfirm(e, "In") }}
                      title="Time"
                    />
                  </View>
                </View>
              </View>
              <View className="h-24" style={{ gap: 10 }}>
                <Typography class="text-primaryGreen">Time Out</Typography>
                <View className="flex-1 flex-row justify-between" style={{ gap: 10 }}>
                  <View className="flex-1">
                    <DateTimePickers
                      date={timeOut}
                      onChange={(e) => { handleDateChange(e, 'end') }}
                      title="Date"
                    />
                  </View>
                  <View className="flex-1">
                    <TimePicker
                      time={outTime}
                      onChange={(e) => { handleConfirm(e, "Out") }}
                      title="Time"
                    />
                  </View>
                </View>
              </View>
              <View className="" style={{ gap: 5 }}>
                <Typography class="text-primaryGreen">Associate Mileage (Km)</Typography>
                <Input
                  label="Associate Mileage (Km)"
                  placeholder="Enter your Associate Mileage"
                  value={formik.values.associateMileage}
                  onChangeText={formik.handleChange("associateMileage")}
                  onBlur={formik.handleBlur("associateMileage")}
                  isError={
                    !!formik.touched.associateMileage &&
                    !!formik.errors.associateMileage
                  }
                  error={formik.errors.associateMileage}
                  onSubmitEditing={formik.submitForm as () => void}
                />
              </View>
              <View className="">
                <Typography class="text-primaryGreen">Notes/Observations</Typography>
                <TextArea
                  placeholder="Notes..."
                  numberOfLines={2}
                  className="min-h-[200px]"
                  value={formik.values.notes}
                  onChangeText={formik.handleChange("notes")}
                  onBlur={formik.handleBlur("notes")}
                  isError={
                    !!formik.touched.notes &&
                    !!formik.errors.notes
                  }
                  error={formik.errors.notes}
                  onSubmitEditing={formik.submitForm as () => void}
                />
              </View>
              {!signature ? <View className="flex-1">
                <Button
                  onPress={() => { setClientSignatureModal(true) }}
                  className="bg-[#07092B]"
                >Collect Client Signature</Button>
              </View>
                :
                <View style={[backgroundShadow.backgroundShadow, { shadowOffset: { width: 1, height: 1 }, shadowRadius: 4, marginTop: -5 }]}>
                  <Image
                    resizeMode={"contain"}
                    style={{ width: 335, height: 114 }}
                    source={{ uri: signature.url }}
                  />
                </View>
              }
              {signature && <View className="h-14">
                <Button
                  onPress={formik.handleSubmit as (values: any) => any}
                  className={cn('px-0 bg-primaryRed font-PoppinsSemiBold')}>
                  Submit Log Mileage
                </Button>
              </View>}
            </View>
          </ScrollView>
          <ClientSignatureModal
            modalVisible={clientSignatureModal}
            handleModalVisible={() => {
              setClientSignatureModal(false);
            }}
            handleSubmit={(sign: imagePdfFileTypeProps) => {
              setSignature(sign)
            }}
          />
          {/* <SingleBottomButton
            //@ts-ignore
            handlePress1={formik.handleSubmit as (values: any) => any}
            tilte="Submit QA"
          /> */}
          {/* <View className="h-20">
            <Button
              onPress={formik.handleSubmit as (values: any) => any}
            >
              submit
            </Button>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default DocumentInfo;