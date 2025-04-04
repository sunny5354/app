import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Entypo } from '@expo/vector-icons';

// Custom Imports
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';

import { selectedValueProp,selectedUploadValueProp } from '../../types/types';
import AgencyFormModal from '../Modals/AgencyFormModal';

type MenuDropDownProps = {
  label: string;
  className?: string;
  classView?: string;
  selectedValue: selectedUploadValueProp,
  data: selectedUploadValueProp[]
  setSelectedValue: (val: selectedUploadValueProp) => void
};



const CustomDropdown: React.FC<MenuDropDownProps> = ({ label, selectedValue, setSelectedValue, data }) => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <View className={`my-1 flex-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row h-12`}>
        <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white pl- pr-3'>{label}</Typography>
        <TouchableOpacity onPress={() => setOpenModal(true)} className='flex-1'>
          <View className='flex-row justify-between'>
            <View className='flex-row items-center'>
              {/* @ts-ignore */}
              <Typography variant='sm' class='text-black'>{selectedValue.formname}</Typography>
            </View>
            <Entypo name="chevron-down" size={24} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
      <AgencyFormModal
        modalVisible={openModal}
        handleModalVisible={() => setOpenModal(!openModal)} // @ts-ignore
        selectedValue={selectedValue._id}
        data={data}
        label={label}
        handleSelectedValue={(val: selectedUploadValueProp) => {
          setSelectedValue(val);
          setOpenModal(false);
        }}
      />
    </>
  )
}

export default CustomDropdown;