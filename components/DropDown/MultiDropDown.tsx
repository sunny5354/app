import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Entypo } from '@expo/vector-icons';

// Custom Imports
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';
import ValueModal from '../Modals/ValueModal';
import { selectedValueProp } from '../../types/types';
import MultiValueModal from '../Modals/MultiValueModal';

type MenuDropDownProps = {
  label: string;
  className?: string;
  classView?: string;
  selectedValue: string[] | null,
  data: selectedValueProp[]
  setSelectedValue: (val: string[] | null) => void
};



const MultiDropDown: React.FC<MenuDropDownProps> = ({ label, classView, className, selectedValue, setSelectedValue, data, ...otherProps }) => {


  const [openModal, setOpenModal] = useState(false);
  const handleSelect = (value: string) => {
    if (selectedValue === null) {
      setSelectedValue([value]);
    } else if (selectedValue.includes(value)) {
      console.log("here")
      const filteredArray = selectedValue.filter((i) => i !== value);
      setSelectedValue(filteredArray.length === 0 ? null : filteredArray);
    } else {
      setSelectedValue([...selectedValue, value]);
    }
  }

  return (
    <>
      <View className={cn('my-1 flex-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row max-h-12', classView)}>
        <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white pl-1 pr-3'>{label}</Typography>
        <TouchableOpacity onPress={() => setOpenModal(true)} className='flex-1'>
          <View className='flex-row justify-between w-full'>
            <View className='flex-row items-center' style={{ gap: 10 }}>
              <Typography variant='sm' class='text-black'>{!selectedValue ? "No item selected" : selectedValue.length.toString() + " items selected"}</Typography>
            </View>
            <Entypo name="chevron-down" size={24} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
      <MultiValueModal
        modalVisible={openModal}
        handleModalVisible={() => setOpenModal(!openModal)}
        selectedValue={selectedValue}
        data={data}
        label={label}
        handleSelectedValue={(val: string) => {
          console.log(val);
          handleSelect(val);
          // setSelectedValue(val);
          // setOpenModal(false);
        }}
      />
    </>
  )
}

export default MultiDropDown;