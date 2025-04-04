import { View, ScrollView,Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { ScreenProps } from '../../types/navigation'
import BackHeader from '../../components/Headers/BackHeader'
import ActaImage from  '../../assets/logo.png'
import Typography from '../../components/Typography/Typography'

const About = ({ navigation }: ScreenProps) => {
  return (
    <View className='flex-1 bg-background'>
      <BackHeader
        title='About Acta Staffing Mobile App'
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 0 }}>
          <Image
            source={ActaImage}
            alt='logo'
            className='h-20 w-28'
            resizeMode='contain'
          />
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>
            Acta Staffing Mobile App is revolutionizing the way hospice clinicians work by putting choice and flexibility
            at the forefront. We empower healthcare professionals to take control of their schedules, select shifts that
            suit their lifestyle, and earn more—all from the convenience of a mobile device.
            </Typography>
          </Text>
         <Text style={styles.headline}><Typography variant='smb'>Why Choose Acta?</Typography></Text>
         <Text style={styles.paragraph}>
         <Typography variant='xsm'>
          Acta connects verified clinicians with top-rated hospice and home health agencies in their local area, 
          matching opportunities to individual preferences. Whether you are a seasoned healthcare professional or a 
          passionate newcomer, Acta is designed to simplify your work-life balance.
          </Typography>
          </Text>
          <Text style={styles.paragraph} className='mt-2'>
          <Typography variant='xsm'>
            Are you tired of mandatory overtime, working weekends, and missing out on holidays? With Acta, you’re in 
            charge of your own schedule. Choose when, where, and how you want to work—because your time and preferences 
            matter.
          </Typography>
          </Text>
          <Text style={styles.headline}><Typography variant='smb'>Who Can Benefit from Acta?</Typography></Text>
          <Text className='mb-2'><Typography variant='xsm'>Acta is perfect for:</Typography></Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}><Typography variant='xsm'>• Hospice Physicians (HPs)</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Medical Doctors (MDs)</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Registered Nurses (RNs)</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• PRN Professionals</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Certified Nursing Assistants (CNAs)</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Social Workers</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Bereavement Counselors</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Chaplains</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Physical and Occupational Therapists</Typography></Text>
            <Text style={styles.listItem}><Typography variant='xsm'>• Other Hospice Healthcare Workers</Typography></Text>
          </View>

          <Text style={styles.headline}><Typography variant='smb'>Features That Make Acta Stand Out</Typography></Text>
          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Jobs at Your Fingertips </Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Find and apply for local shifts instantly with our user-friendly app.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Minimized Compliance Hassles</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>We streamline the onboarding and compliance process so you can focus on what matters most—caring for your patients.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Work on Your Terms</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Choose your preferred days and shifts without worrying about mandatory requirements.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Quality Assurance on Mobile</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Enjoy seamless QA features directly within the app to ensure you meet professional standards effortlessly.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Real-Time Notifications</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Stay updated with instant alerts for new shifts, approvals, and important updates.</Typography></Text>
         

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Easy Earnings Tracking</Typography>            
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Monitor your income and payments through a transparent and organized dashboard.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>24/7 Support</Typography> 
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Get assistance whenever you need it with our dedicated customer support team.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Secure and Reliable</Typography>  
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Your data is protected with the highest security standards, ensuring your information remains safe.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Personalized Shift Recommendations</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Receive tailored shift suggestions based on your preferences and availability.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsmb'>Seamless Communication</Typography>
          </Text>
          <Text className='mt-1'><Typography variant='xsm'>Connect easily with agencies and colleagues through in-app messaging.</Typography></Text>

          <Text style={styles.listItem} className='mt-2'>
            <Typography variant='xsm'>Acta isn’t just an app; it’s a partner in your career. Join our community today and experience the freedom and flexibility you deserve.</Typography>
          </Text>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  headline: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 2
  },
  paragraph: {
    fontSize: 15
  },
  listContainer: {
    alignItems: "flex-start"
  },
  listItem: {
    fontSize: 15,
    color: "#333",
    marginBottom: 5
  },
});