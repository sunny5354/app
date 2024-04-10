import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Entypo } from '@expo/vector-icons';

// Custom Imports
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';
import ValueModal from '../Modals/ValueModal';
import { selectedValueProp } from '../../types/types';

type MenuDropDownProps = {
  label: string;
  className?: string;
  classView?: string;
  selectedValue: selectedValueProp,
  data: selectedValueProp[]
  setSelectedValue: (val: selectedValueProp) => void
};



const MenuDropDown: React.FC<MenuDropDownProps> = ({ label, classView, className, selectedValue, setSelectedValue, data, ...otherProps }) => {


  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <View className={cn('my-1 flex-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row max-h-12', classView)}>
        <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white pl-1 pr-3'>{label}</Typography>
        <TouchableOpacity onPress={() => setOpenModal(true)} className='flex-1'>
          <View className='flex-row justify-between w-full'>
            <View className='flex-row items-center' style={{ gap: 10 }}>
              {
                selectedValue.img && (
                  <Image
                    source={selectedValue.img}
                    alt='Test Image'
                  />
                )
              }
              <Typography variant='sm' class='text-black'>{selectedValue.label}</Typography>
            </View>
            <Entypo name="chevron-down" size={24} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
      <ValueModal
        modalVisible={openModal}
        handleModalVisible={() => setOpenModal(!openModal)}
        selectedValue={selectedValue.value}
        data={data}
        label={label}
        handleSelectedValue={(val: selectedValueProp) => {
          setSelectedValue(val);
          setOpenModal(false);
        }}
      />
    </>
  )
}

export default MenuDropDown;