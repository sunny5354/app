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



const CustomDropdown: React.FC<MenuDropDownProps> = ({ label, classView, className, selectedValue, setSelectedValue, data, ...otherProps }) => {


  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <View className={cn('my-1 flex-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row max-h-12', classView)}>
        <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white pl-1 pr-3'>{label}</Typography>
        <TouchableOpacity onPress={() => setOpenModal(true)} className='flex-1'>
          <View className='flex-row justify-between w-full'>
            <View className='flex-row items-center' style={{ gap: 10 }}>
              {/* {
                selectedValue.img && (
                  <Image
                    source={selectedValue.img}
                    alt='Test Image'
                  />
                )
              } */}
              <Typography variant='sm' class='text-black'>{selectedValue.formname}</Typography>
            </View>
            <Entypo name="chevron-down" size={24} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
      <AgencyFormModal
        modalVisible={openModal}
        handleModalVisible={() => setOpenModal(!openModal)}
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