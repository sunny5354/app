import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'



import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import colors from '../../config/colors'
import UploadCard from '../../components/Cards/UploadCard'
import pdf from "../../assets/icons/pdf.png"
import { TaxDataProps, UploadedDataProps, imagePdfFileTypeProps, selectedValueProp } from '../../types/types'
import { errorToast, infoToast, successToast } from '../../lib/toast'
import { addTax, getTax } from '../../http/profile/tax'
import TaxCard from '../../components/Cards/TaxCard'
import Loading from '../Loading'
import PdfViewCard from '../../components/Cards/PdfViewCard'
import { TaxProps } from '../../types/http'
import { useIsFocused } from '@react-navigation/native'
import { getStatus } from '../../http/home'



const TaxDocs = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [taxData, setTaxData] = useState<imagePdfFileTypeProps | null>(null);
  const [resetUploadCard, setResetUploadCard] = useState(false);

  const handleVerify = async () => {
    if (!uploadedDoc) {
      infoToast("Please upload covid certificate");
      return;
    }
    try {
      const obj: TaxProps = {
        document: uploadedDoc._id
      }
      const result = await addTax(obj);
      successToast(result.message);
      fetchTaxDoc();
      setResetUploadCard(!resetUploadCard);
      setUploadedDoc(null);
    } catch (error: any) {
      console.log("Tax add error=>", error.response.data);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  const fetchTaxDoc = async () => {
    setLoading(true);
    try {
      const result = await getTax();
      // console.log(result.tax)
      setTaxData(result.tax.document);
    } catch (error: any) {
      // console.log("Tax error=>", error.response.data);
      // errorToast(error.response.data.message ?? "Error Occured!");
    }
    setLoading(false);
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
    fetchTaxDoc();
  }, [refresh])

  if (loading) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <Typography class='font-PoppinsSemiBold'>Provide Your Tax Document</Typography>
        <View className='flex-1' style={styles.backgroundShadow}>
          {!uploadedDoc ? <UploadCard
            title='Upload Tax Document'
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
          {/* <View className='justify-center items-center flex-1'>
            <Button onPress={handleVerify}>Verify</Button>
          </View> */}
        </View>
        <View className='mt-5' />
        {/* <Divider /> */}
        <View className='flex-1' style={{ gap: 25 }}>
          {
            taxData ?
              <TaxCard setRefresh={setRefresh} tax={taxData} />
              :
              (
                <View className='flex-1 justify-center items-center'>
                  <Typography class='text-center'>No Tax Document Found</Typography>
                </View>
              )
          }
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => { handleVerify() }}
        disabled={role === "agency-clinician" && userStatus !== "Active"}
        text='Save'
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

    marginTop: 30,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 20,
    gap: 10,
  }
})

export default TaxDocs