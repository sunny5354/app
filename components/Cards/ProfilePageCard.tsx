import { Pressable, Image } from 'react-native'
import React from 'react'
import check from "../../assets/icons/checkBlue.png"
import warning from "../../assets/icons/warning.png"
import Typography from '../Typography/Typography'


type ProfilePageCardProps = {
  complete: boolean,
  title: string,
  onPress: () => void;
} & React.ComponentProps<typeof Pressable>


const ProfilePageCard: React.FC<ProfilePageCardProps> = ({ complete, title, onPress }) => {
  return (
    <Pressable onPress={onPress} className='py-5 mx-5 flex-row border-b border-primaryGreen items-center'>
      {complete ? <Image
        source={check}
        alt='Check Or Warning'
        style={{ width: 25, height: 25, marginRight: 10 }}
      />
        :
        <Image
          source={warning}
          alt='Check Or Warning'
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
      }
      <Typography>{title}</Typography>
    </Pressable>
  )
}

export default ProfilePageCard