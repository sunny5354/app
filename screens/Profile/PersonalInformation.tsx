

import { View, ScrollView, StyleSheet, Switch, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFormik, FormikErrors } from 'formik'; // Import FormikErrors
import * as yup from 'yup';

import Typography from '../../components/Typography/Typography';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import { UploadedDataProps, selectedValueProp } from '../../types/types';
import MenuDropDown from '../../components/DropDown';
import { IdTypeData, country, gender, state } from '../../data/data';
import BottomButton from '../../components/BottomButton';
import { ScreenNavigationProp } from '../../types/navigation';
import DateTimePickers from '../../components/DateTimePicker';
import TextArea from '../../components/Input/TextArea';
import colors from '../../config/colors';
import pdf from '../../assets/icons/pdf.png';
import photo from '../../assets/icons/photo.png';
import { cn } from '../../lib/cn';
import { BasicDataInfoProps } from '../../types/profile';
import { deleteIdProof, editPersonalInforUser, getBasicInfoUser } from '../../http/profile/basic';
import Loading from '../Loading';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { PersonalInfoProps } from '../../types/http';
import PdfViewCard from '../../components/Cards/PdfViewCard';
import ImageViewCard from '../../components/Cards/ImageViewCard';
import Button from '../../components/Button';
import DeleteModal from '../../components/Modals/DeleteModal';
import { getCounty, getDropDown } from '../../http/util/dropdown';
import { useIsFocused } from '@react-navigation/native';
import { getStatus } from '../../http/home';
import { fetchDocument } from '../../lib/fetchDocument';
import { uploadFile, uploadImage } from '../../http/util/uploadFile';

// Define UploadCardProps
interface UploadCardProps {
  img?: any;
  reset?: boolean;
  type: string[];
  shortDesc: string;
  title: string;
  onPress: (res: UploadedDataProps) => void;
}

// Define Form Values Type
interface FormValues {
  street: string;
  houseNo: string;
  pincode: string;
  city: string;
}

// UploadCard Component
const UploadCard: React.FC<UploadCardProps> = ({ img, reset, type, shortDesc, title, onPress }) => {
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await fetchDocument(type);
      
      if (!result || result.canceled || !result.assets || !result.assets[0]) {
        infoToast('Upload cancelled or no file selected');
        return;
      }
      
      setIsUploading(true);
      
      // Log file details to help with debugging
      console.log('Uploading file:', {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].name,
        size: result.assets[0].size,
      });
      
      let res;
      try {
        if (type[0] === 'application/pdf') {
          res = await uploadFile(result.assets[0]);
        } else {
          res = await uploadImage(result.assets[0]);
        }
        
        if (!res || !res.file) {
          throw new Error('Invalid response from server');
        }
        
        const fileData: UploadedDataProps = res.file;
        console.log('Successfully uploaded file:', fileData);
        onPress(fileData);
        setUploadedDoc(fileData);
        
      } catch (error: any) {
        console.error('Upload network error:', error);
        // Display more helpful error message based on the error
        if (error.message === 'Network Error') {
          errorToast('Network connection issue. Please check your internet connection and try again.');
        } else if (error.response?.status === 413) {
          errorToast('File too large. Please try with a smaller file.');
        } else {
          errorToast(error.response?.data?.message || 'Failed to upload file. Please try again.');
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Upload Error:', error.message || error);
    } finally {
      setIsUploading(false);
    }
  };
  useEffect(() => {
    if (reset) {
      setUploadedDoc(null);
      setIsUploading(false);
    }
  }, [reset]);

  if (isUploading) {
    return (
      <View className="flex-1 py-5 justify-center items-center border-border border-2 m-2 border-dashed min-h-[240px] rounded-xl" style={{ gap: 10 }}>
        <Typography variant="xl">Uploading....</Typography>
      </View>
    );
  }

  if (uploadedDoc) {
    return (
      <View className="justify-center items-center">
        <Typography>File Uploaded Successfully</Typography>
        <Typography variant="xsm">Name: {uploadedDoc.name}</Typography>
      </View>
    );
  }

  return (
    <View className="flex-1 py-5 justify-between items-center border-border border-2 m-2 border-dashed min-h-[240px] rounded-xl" style={{ gap: 10 }}>
      <View className="justify-center items-center" style={{ gap: 15 }}>
        <Typography variant="xl" class="text-center">{title}</Typography>
        <View className="h-36 w-36 border-dashed rounded-full flex-1 border-2 border-border items-center justify-center" style={{ gap: 10 }}>
          {img && <Image source={img} alt="icon" className="h-10 w-10" />}
          <Typography variant="xsm" class="text-center mx-2">{shortDesc}</Typography>
        </View>
        <Button onPress={handleUpload}>Upload</Button>
      </View>
    </View>
  );
};

const PersonalInformation = ({ navigation }: { navigation: ScreenNavigationProp }) => {
  const [date, setDate] = useState(new Date());
  const [states, setStates] = useState<selectedValueProp[]>([{ label: 'Nothing to show', value: '0' }]);
  const [county, setCounty] = useState<selectedValueProp[]>([{ label: 'Nothing to show', value: '0' }]);
  const [selectCountry, setSelectedCountry] = useState<selectedValueProp>({ label: 'Select Country', value: '0' });
  const [selectGender, setSelectedGender] = useState<selectedValueProp>({ label: 'Select Gender', value: '0' });
  const [selectState, setSelectedState] = useState<selectedValueProp>({ label: 'Select State', value: '0' });
  const [idType, setIdType] = useState<selectedValueProp[]>([{ label: 'Nothing to show', value: '0' }]);
  const [selectCounty, setSelectedCoutny] = useState<selectedValueProp>({ label: 'Select County', value: '0' });
  const [selectIdType, setSelectedIdType] = useState<selectedValueProp>({ label: 'Select ID Type', value: '0' });
  const [frontOfID, setFrontOfID] = useState<null | UploadedDataProps>(null);
  const [backOfID, setBackOfID] = useState<null | UploadedDataProps>(null);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [personalInfo, setPersonalInfo] = useState<BasicDataInfoProps | null>(null);
  const [primaryArea, setPrimaryArea] = useState('');
  const [profReference1, setProfreference1] = useState({ name: '', designation: '', organization: '', mobileNo: '' });
  const [profReference2, setProfreference2] = useState({ name: '', designation: '', organization: '', mobileNo: '' });
  const [deleteModal, setDeleteModal] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [resetUploadCard, setResetUploadCard] = useState(false);

  const toggleSwitch = () => setIsMarried((prev) => !prev);

  const validationSchema = yup.object({
    street: yup.string().required('Street is required'),
    houseNo: yup.string().required('House No. is required'),
    pincode: yup.string().required('Required').min(5, 'Minimum 5'),
    city: yup.string().required('Required'),
  });

  const formik = useFormik<FormValues>({
    initialValues: { street: '', houseNo: '', pincode: '', city: '' },
    validationSchema,
    onSubmit: async (values) => {
      if (selectIdType.value === '0') {
        infoToast('Please select ID Type');
        return;
      }
      if (!frontOfID || !backOfID) {
        infoToast('Please upload both sides of ID');
        return;
      }
      if (!uploadedDoc) {
        infoToast('Please upload CV/Resume');
        return;
      }
      setIsBtnLoading(true);
      try {
        const obj: PersonalInfoProps = {
          idProof: { idType: selectIdType.value, front: frontOfID!._id!, back: backOfID!._id! },
          resume: uploadedDoc!._id!,
          address: {
            city: values.city,
            county: selectCounty.value,
            state: selectState.value,
            street: values.street,
            houseNo: values.houseNo,
            zipCode: parseInt(values.pincode),
          },
          dob: date.toString(),
          gender: selectGender.value,
          maritalStatus: isMarried,
          primaryArea,
          professionalReference1: profReference1,
          professionalReference2: profReference2,
        };
        console.log('Submitting Personal Info:', obj);
        const result = await editPersonalInforUser(obj);
        successToast(result.message ?? 'Personal Information Updated');
        navigation.goBack();
      } catch (error: any) {
        console.error('Submit Error:', error.response?.data || error);
        errorToast(error.response?.data?.message ?? 'Error Occurred');
      } finally {
        setIsBtnLoading(false);
      }
    },
  });

  const isFocused = useIsFocused();
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState('Active');

  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      setUserStatus(res.status);
      setRole(res.role);
    } catch (error: any) {
      console.error('Status Error:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, [isFocused]);

  const handleDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setDate(currentDate);
  };

  const handleDeleteId = async () => {
    try {
      await deleteIdProof();
      setFrontOfID(null);
      setBackOfID(null);
      setDeleteModal(false);
      setResetUploadCard(true);
      successToast('ID deleted successfully');
    } catch (error: any) {
      errorToast(error.response?.data?.message ?? 'Error Occurred');
    } finally {
      setResetUploadCard(false);
    }
  };

  const fetchPersonalInfo = async () => {
    try {
      const result = await getBasicInfoUser();
      console.log('Fetched Personal Info:', result);
      setDate(new Date(result.personal.dob));
      setPersonalInfo(result.personal);
      formik.setValues({
        street: result.personal.address.street,
        houseNo: result.personal.address.houseNo,
        pincode: result.personal.address.zipCode.toString(),
        city: result.personal.address.city,
      });
      setSelectedCountry({ label: result.personal.address.country, value: result.personal.address.country });
      setSelectedState({ label: result.personal.address.state, value: result.personal.address.state });
      setSelectedCoutny({ label: result.personal.address.county, value: result.personal.address.county });
      if (result.personal.primaryArea) setPrimaryArea(result.personal.primaryArea);
      if (result.personal.professionalReference1) setProfreference1(result.personal.professionalReference1);
      if (result.personal.professionalReference2) setProfreference2(result.personal.professionalReference2);
      setSelectedGender({ label: result.personal.gender, value: result.personal.gender });
      setIsMarried(result.personal.maritalStatus);
      if (result.personal.idProof) {
        setSelectedIdType({ label: result.personal.idProof.idType, value: result.personal.idProof.idType });
        setFrontOfID({ name: result.personal.idProof.front.name, url: result.personal.idProof.front.url, _id: result.personal.idProof.front._id });
        setBackOfID({ name: result.personal.idProof.back.name, url: result.personal.idProof.back.url, _id: result.personal.idProof.back._id });
      }
      if (result.personal.resume) {
        setUploadedDoc({ name: result.personal.resume.name, url: result.personal.resume.url, _id: result.personal.resume._id });
      }
    } catch (error: any) {
      console.error('Fetch Personal Info Error:', error.response?.data || error);
    }
  };

  const fetchStateDropDown = async (_id: string) => {
    try {
      const result = await getDropDown(_id);
      setStates(result.dropDown.options);
    } catch (error: any) {
      errorToast('Error fetching State');
      console.error('Fetch State Error:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (selectCountry.value === 'India') fetchStateDropDown('65e9879caa7d608644888b73');
    if (selectCountry.value === 'USA') fetchStateDropDown('65e987764d1b2bac59847cdd');
    if (selectCountry.value === 'Singapore') fetchStateDropDown('65e986ecdcb8f91445d40337');
  }, [selectCountry]);

  useEffect(() => {
    const fetchCounty = async () => {
      if (selectState.value === '0') {
        setCounty([{ label: 'Select state first', value: '0' }]);
        return;
      }
      try {
        const result = await getCounty(selectState.value);
        const countyData = result.results.map((_: any) => ({ label: _.coty_name[0], value: _.coty_name[0] }));
        setCounty(countyData);
      } catch (error: any) {
        errorToast('Error fetching County');
        console.error('Fetch County Error:', error.response?.data?.message);
      }
    };
    fetchCounty();
  }, [selectState]);

  const fetchIdType = async () => {
    try {
      const result = await getDropDown('65fb37acb483af86024688de');
      setIdType(result.dropDown.options);
    } catch (error: any) {
      errorToast('Error fetching ID Type');
      console.error('Fetch ID Type Error:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchIdType();
    fetchPersonalInfo();
  }, [isFocused]);

  if (!personalInfo) return <Loading />;

  return (
    <View className="flex-1 relative">
      <ScrollView className="p-4 bg-white flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-1" style={{ gap: 10 }}>
          <Typography>General Information</Typography>
          <View className="flex-row flex-1" style={{ gap: 10 }}>
            <View className="flex-1">
              <DateTimePickers date={date} onChange={handleDateChange} title="Date of Birth*" />
            </View>
            <MenuDropDown label="Gender*" selectedValue={selectGender} setSelectedValue={setSelectedGender} data={gender} />
          </View>
          <Typography>Marital Status</Typography>
          <View className="border-border border flex-row justify-center items-center p-4 rounded-xl" style={{ gap: 25 }}>
            <Typography class={cn(isMarried ? 'font-Poppins' : 'font-PoppinsMedium')}>Unmarried</Typography>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={isMarried ? '#7297F7' : '#FD8A94'}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch}
              value={isMarried}
            />
            <Typography class={cn(!isMarried ? 'font-Poppins' : 'font-PoppinsMedium')}>Married</Typography>
          </View>
        </View>
        <Divider />
        <View className="flex-1" style={{ gap: 10 }}>
          <Typography>Location</Typography>
          <View className="flex-1" style={{ gap: 10 }}>
            <MenuDropDown label="State/Union Territory*" selectedValue={selectState} setSelectedValue={setSelectedState} data={states} />
            <MenuDropDown label="County*" selectedValue={selectCounty} setSelectedValue={setSelectedCoutny} data={county} />
            <View className="h-16 flex-row justify-between items-center" style={{ gap: 20 }}>
              <Input
                label="City*"
                placeholder="Enter City"
                value={formik.values.city}
                onChangeText={formik.handleChange('city')}
                onBlur={formik.handleBlur('city')}
                isError={!!formik.touched.city && !!formik.errors.city}
                error={formik.errors.city || ''} // Ensure string
                onSubmitEditing={formik.submitForm}
                classView="flex-1"
              />
              <Input
                label="Zip Code*"
                width="w-28"
                placeholder="000000"
                maxLength={6}
                keyboardType="number-pad"
                value={formik.values.pincode}
                onChangeText={formik.handleChange('pincode')}
                onBlur={formik.handleBlur('pincode')}
                isError={!!formik.touched.pincode && !!formik.errors.pincode}
                error={formik.errors.pincode || ''} // Ensure string
                onSubmitEditing={formik.submitForm}
                classView="flex-1"
              />
            </View>
            <Input
              label="Street*"
              placeholder="Street name"
              value={formik.values.street}
              onChangeText={formik.handleChange('street')}
              onBlur={formik.handleBlur('street')}
              isError={!!formik.touched.street && !!formik.errors.street}
              error={formik.errors.street || ''} // Ensure string
              onSubmitEditing={formik.submitForm}
              classView="flex-1"
            />
            <Input
              label="House No., Apartment, etc.*"
              placeholder="House no., apt, sweet, etc."
              value={formik.values.houseNo}
              onChangeText={formik.handleChange('houseNo')}
              onBlur={formik.handleBlur('houseNo')}
              isError={!!formik.touched.houseNo && !!formik.errors.houseNo}
              error={formik.errors.houseNo || ''} // Ensure string
              onSubmitEditing={formik.submitForm}
              classView="flex-1"
            />
          </View>
        </View>
        <Divider />
        <View className="flex-1" style={{ gap: 10 }}>
          <Typography>Documents</Typography>
          <View className="flex-1" style={styles.backgroundShadow}>
            <View className="border-b border-primaryGreen px-2 py-2">
              <Typography class="text-center">ID Proof</Typography>
              <Typography variant="sm">Submit photographs of official identification document issued by the government.</Typography>
            </View>
            <View className="p-2 flex-1" style={{ gap: 10 }}>
              <MenuDropDown label="ID Type*" selectedValue={selectIdType} setSelectedValue={setSelectedIdType} data={idType} />
              {!frontOfID ? (
                <UploadCard
                  title="Front of ID"
                  img={photo}
                  shortDesc="JPG or PNG format Max size 5 MB"
                  onPress={(res: UploadedDataProps) => setFrontOfID(res)}
                  type={['image/jpeg', 'image/png']}
                  reset={resetUploadCard}
                />
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Typography>Front of ID</Typography>
                  <ImageViewCard _id={frontOfID._id} url={frontOfID.url} name={frontOfID.name} setUploadedDoc={setFrontOfID} />
                </View>
              )}
              {!backOfID ? (
                <UploadCard
                  title="Back of ID"
                  img={photo}
                  shortDesc="JPG or PNG format Max size 5 MB"
                  onPress={(res: UploadedDataProps) => setBackOfID(res)}
                  type={['image/jpeg', 'image/png']}
                  reset={resetUploadCard}
                />
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Typography>Back of ID</Typography>
                  <ImageViewCard name={backOfID.name} _id={backOfID._id} url={backOfID.url} setUploadedDoc={setBackOfID} />
                </View>
              )}
            </View>
            {frontOfID && backOfID && (
              <View className="px-5 flex-1 pb-4">
                <Button onPress={() => setDeleteModal(true)} variant="delete">
                  Delete ID
                </Button>
              </View>
            )}
          </View>
          <View className="flex-1" style={styles.backgroundShadow}>
            <View className="border-b border-primaryGreen px-2 py-2">
              <Typography class="text-center">CV / Resume</Typography>
              <Typography variant="sm">Submit your updated CV or Resume in PDF format.</Typography>
            </View>
            <View className="p-2 flex-1">
              {!uploadedDoc ? (
                <UploadCard
                  title=""
                  img={pdf}
                  shortDesc="PDF format only Max size 10 MB"
                  onPress={(res: UploadedDataProps) => setUploadedDoc(res)}
                  type={['application/pdf']}
                  reset={resetUploadCard}
                />
              ) : (
                <PdfViewCard setUploadedDoc={setUploadedDoc} name={uploadedDoc.name} _id={uploadedDoc._id} url={uploadedDoc.url} />
              )}
            </View>
          </View>
        </View>
        <Divider />
        <View className="flex-1" style={{ gap: 10 }}>
          <Typography>Specialty in Primary Area of Practice</Typography>
          <TextArea
            value={primaryArea}
            placeholder="Specialty in Primary Area of Practice"
            onChangeText={setPrimaryArea}
            numberOfLines={10}
            onSubmitEditing={formik.submitForm}
          />
        </View>
        <Divider />
        <View className="flex-1" style={{ gap: 10 }}>
          <Typography>Professional References</Typography>
          <Divider />
          <Typography>Professional Reference 1.</Typography>
          <View className="h-16 flex-row justify-between items-center" style={{ gap: 20 }}>
            <Input
              label="Name"
              placeholder="Enter Name"
              id="name"
              value={profReference1?.name}
              onChangeText={(val) => setProfreference1((prev) => ({ ...prev, name: val }))}
              classView="flex-1"
            />
            <Input
              label="Designation"
              placeholder="Enter Designation"
              id="designation"
              value={profReference1?.designation}
              onChangeText={(val) => setProfreference1((prev) => ({ ...prev, designation: val }))}
              classView="flex-1"
            />
          </View>
          <View className="h-16 flex-row justify-between items-center" style={{ gap: 20 }}>
            <Input
              label="Organization"
              placeholder="Enter Organization"
              id="organization"
              value={profReference1?.organization}
              onChangeText={(val) => setProfreference1((prev) => ({ ...prev, organization: val }))}
              classView="flex-1"
            />
            <Input
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              value={profReference1?.mobileNo?.toString()}
              onChangeText={(val) => setProfreference1((prev) => ({ ...prev, mobileNo: val }))}
              keyboardType="numeric"
              classView="flex-1"
            />
          </View>
          <Divider />
          <Typography>Professional Reference 2.</Typography>
          <View className="h-16 flex-row justify-between items-center" style={{ gap: 20 }}>
            <Input
              label="Name"
              placeholder="Enter Name"
              value={profReference2?.name}
              onChangeText={(val) => setProfreference2((prev) => ({ ...prev, name: val }))}
              classView="flex-1"
            />
            <Input
              label="Designation"
              placeholder="Enter Designation"
              value={profReference2?.designation}
              onChangeText={(val) => setProfreference2((prev) => ({ ...prev, designation: val }))}
              classView="flex-1"
            />
          </View>
          <View className="h-16 flex-row justify-between items-center" style={{ gap: 20 }}>
            <Input
              label="Organization"
              placeholder="Enter Organization"
              value={profReference2?.organization}
              onChangeText={(val) => setProfreference2((prev) => ({ ...prev, organization: val }))}
              classView="flex-1"
            />
            <Input
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              value={profReference2?.mobileNo?.toString()}
              onChangeText={(val) => setProfreference2((prev) => ({ ...prev, mobileNo: val }))}
              classView="flex-1"
            />
          </View>
        </View>
      </ScrollView>
      <BottomButton onPress={formik.handleSubmit} text="Save" isLoading={isBtnLoading} />
      <DeleteModal
        modalVisible={deleteModal}
        handleDelete={handleDeleteId}
        handleModalVisible={() => setDeleteModal(false)}
        text="Are you sure you want to delete ID's?"
        label="ID"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundShadow: {
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    gap: 10,
  },
});

export default PersonalInformation;