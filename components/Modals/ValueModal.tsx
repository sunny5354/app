import React, { useEffect, useState } from "react";
import { View, Modal, ScrollView, Pressable, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// Custom Imports
import { ValueChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import Typography from "../Typography/Typography";
import colors from "../../config/colors";
import Input from "../Input";


const ValueModal: React.FC<ValueChildrenProps> = ({
  modalVisible,
  handleModalVisible,
  selectedValue,
  handleSelectedValue,
  data,
  label,
  ...otherProps
}) => {

  const [dropDownData, setDropDownData] = useState(data);

  const handleSearch = (e: string) => {
    const searchedData = data.filter((val) => val.label.toLowerCase().includes(e.toLowerCase()));
    setDropDownData(searchedData);
  }

  useEffect(() => {
    setDropDownData(data);
  }, [data])

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        handleModalVisible();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
      {...otherProps}
    >
      <View
        className={cn(
          `flex-1 justify-center items-center mt-2 rounded-t-3xl overflow-hidden relative`
        )}
      >
        <Pressable onPress={() => { handleModalVisible() }} className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        />
        <View className=" w-80 overflow-hidden min-h-[100px] max-h-80">
          <View className="bg-primaryGreen overflow-hidden justify-center items-center h-12 rounded-t-xl">
            <Typography class="text-white">
              {label}
            </Typography>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: 'white'
            }}
          >
            <View className="px-2">
              <Input
                placeholder="Search here..."
                onChangeText={(e) => handleSearch(e)}
                className="py-2"
              />
            </View>
            {
              dropDownData.map((i, k) => (
                <TouchableOpacity onPress={() => {
                  handleSelectedValue(i)
                  setDropDownData(data);
                }} key={k} className="flex-1 flex-row justify-between px-4 py-3 items-center">
                  <View className="flex-row items-center" style={{ gap: 15 }}>
                    {i.img && <Image
                      source={i.img}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain'
                      }}
                      alt="country"
                    />}
                    <Typography variant="normal" class="text-black">
                      {i.label}
                    </Typography>
                  </View>
                  {selectedValue === i.value && <FontAwesome name="dot-circle-o" size={24} color={colors.primaryGreen} />}
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ValueModal;
