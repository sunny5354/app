import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'



import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button'
import colors from '../../config/colors'
import Divider from '../../components/Divider'
import UploadCard from '../../components/Cards/UploadCard'
import pdf from "../../assets/icons/pdf.png"
import { CovidDataProps, UploadedDataProps, selectedValueProp } from '../../types/types'
import { covidRiskData } from '../../data/data'
import MenuDropDown from '../../components/DropDown'
import { errorToast, infoToast, successToast } from '../../lib/toast'
import { addCovid, getCovid } from '../../http/profile/covid'
import Loading from '../Loading'
import { CovidProps } from '../../types/http'
import CovidCard from '../../components/Cards/CovidCard'
import PdfViewCard from '../../components/Cards/PdfViewCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../types/navigation'
import { getStatus } from '../../http/home'



const Covid = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [selectRiskLevel, setSelectedRiskLevel] = useState<selectedValueProp>({
    label: "Select Risk Level",
    value: '0'
  })
  const [refresh, setRefresh] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [covidData, setCovidData] = useState<CovidDataProps[] | null>(null);
  const [resetUploadCard, setResetUploadCard] = useState(false);

  const handleVerify = async () => {
    if (selectRiskLevel.value === '0') {
      infoToast("Please select risk level");
      return;
    }
    if (!uploadedDoc) {
      infoToast("Please upload covid certificate");
      return;
    }
    try {
      const obj: CovidProps = {
        assessmentDate: (new Date()).toString(),
        riskLevel: selectRiskLevel.value,
        certificate: uploadedDoc._id
      }
      const result = await addCovid(obj);
      successToast(result.message);
      fetchCovid();
      setSelectedRiskLevel({
        label: "Select Risk Level",
        value: '0'
      })
      setResetUploadCard(!resetUploadCard);
      setUploadedDoc(null);
    } catch (error: any) {
      console.log("covid error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  const fetchCovid = async () => {
    try {
      const result = await getCovid();
      setCovidData(result.covids);
    } catch (error: any) {
      console.log("covid error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  const isFocused = useIsFocused();
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      console.log(res);
      setUserStatus(res.status);
      setRole(res.role);
      if (res.status === 'Active') {
      }
      else {
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  useEffect(() => {
    fetchCovid();
  }, [refresh])

  if (!covidData) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <Typography class='font-PoppinsSemiBold'>Add Covid Certificate</Typography>

        {/* <View className='mt-5' /> */}
        <View className='flex-1 mt-4' style={{ gap: 25 }}>
          {
            covidData.length > 0 ?
              covidData.map((v, i) => (
                <CovidCard setRefresh={setRefresh} key={i} covid={v} />
              ))
              :
              (
                <View className='flex-1 justify-center items-center'>
                  <Typography class='text-center'>No Covid Data Found</Typography>
                </View>
              )
          }
        </View>
        <Divider />
        <View style={styles.backgroundShadow}>
          <MenuDropDown label='Self-Assessment' selectedValue={selectRiskLevel} setSelectedValue={setSelectedRiskLevel} data={covidRiskData} />
          {!uploadedDoc ? <UploadCard
            title='Upload Covid-19 Certificate'
            img={pdf}
            shortDesc='PDF format only
          Max size 10 MB'
            onPress={(result) => {
              setUploadedDoc(result)
            }}
            type={["application/pdf"]}
            reset={resetUploadCard}
          />
            : (
              <PdfViewCard setUploadedDoc={setUploadedDoc} _id={uploadedDoc._id} url={uploadedDoc.url} name={uploadedDoc.name} />
            )}
          <View className='px-2 flex-1'>
            <Button
              disabled={role === "agency-clinician" && userStatus !== "Active"}
              onPress={handleVerify}>Verify</Button>
          </View>
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => {
          navigation.goBack();
        }}
        text='Back'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundShadow: {
    backgroundColor: 'white',

    // adding Shadow for andorid
    shadowColor: '#000',
    elevation: 5,
    // adding shadow effect for ios
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 20,
    gap: 10,
  }
})

export default Covid