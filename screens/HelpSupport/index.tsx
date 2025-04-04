import { View, ScrollView,Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import BackHeader from '../../components/Headers/BackHeader'
import { ScreenProps } from '../../types/navigation'
import ActaImage from  '../../assets/logo.png'
import Typography from '../../components/Typography/Typography'
import AddressIcon from '../../assets/icons/address.png'
import CallPhone from '../../assets/icons/phone.png'
import WebsiteIcon from '../../assets/icons/website.png'
import Logo1 from '../../assets/icons/support.png'

const HelpSupport = ({ navigation }: ScreenProps) => {

  return (
    <View className='flex-1'>
      <BackHeader
        title='Help & Support'
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
            At Acta, we are dedicated to providing you with the best possible experience. Whether you have a question, 
            need assistance, or want to share feedback, our team is here to help. Explore the support options below to
            find the assistance you need.
          </Typography>
          </Text>
         <Text style={styles.headline}><Typography variant='smb'>Contact Us</Typography></Text>
         <Text style={styles.paragraph}>
         <Typography variant='xsm'>If you require any support, feel free to reach out to us through the following channels:</Typography>
          </Text>
          
          <Text style={styles.listItem} className='mt-4'>
            <Image source={AddressIcon} style={{width: 20, height: 20}} />
            <Typography variant='xsm'> ACTA Healthcare Resources Management Solutions Inc.
              25350, Magic Mountain Parkway Suite, 300-#94,
              Santa Clarita, California CA- 91355, USA
            </Typography>
          </Text>

          <Text style={styles.listItem}>
            <Image source={CallPhone} style={{width: 20, height: 20}} />
              <Typography variant='xsm'> +1 (213) 290-9198</Typography>         
          </Text>

          <Text style={styles.listItem}>
            <Image source={WebsiteIcon} style={{width: 20, height: 20}} />
            <Typography variant='xsm'> support@actastaffing.com</Typography>
          </Text>

          <Text style={styles.listItem}>
            <Image source={Logo1} style={{width: 20, height: 20}} />
            <Typography variant='xsm'> www.actastaffing.com</Typography>
          </Text>

          <Text style={styles.headline}><Typography variant='smb'>Frequently Asked Questions (FAQs)</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>
            Before reaching out, take a moment to visit our FAQs page on actastaffing.com website. 
            It’s designed to address common queries and provide step-by-step solutions to most issues.
            </Typography>
          </Text>

          <Text style={styles.headline}><Typography variant='smb'>Chat Support</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>
            For immediate assistance, visit www.actastaffing.com and use our real-time chat support. 
            Our support agents are ready to help you with any questions or concerns.
            </Typography>
          </Text>

          <Text style={styles.headline}><Typography variant='smb'>Phone Helpline</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>We understand the importance of timely help. Our dedicated support team is available on 
            phone no. +1 (213) 290-9198 to ensure your concerns are addressed quickly and efficiently.</Typography>
          </Text>

          <Text style={styles.headline}><Typography variant='smb'>Raise a Ticket</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>For submitting an issue, use the Raise a Ticket feature on Acta Staffing website:</Typography>
          </Text>
         <View style={styles.listContainer}>
           <Text style={styles.listItem}><Typography variant='xsm'>1. Navigate to the <Text style={{ fontWeight: "bold" }}>Help & Support </Text>page on actastaffing.com.</Typography></Text>
           <Text style={styles.listItem}><Typography variant='xsm'>2. Click on Raise a Ticket button</Typography></Text>
           <Text style={styles.listItem}><Typography variant='xsm'>3. Submit the details of your query or concern.</Typography></Text>
           <Text style={styles.listItem}><Typography variant='xsm'>4. Our team will respond promptly to resolve your issue.</Typography></Text>
          </View>

          <Text style={styles.headline}><Typography variant='smb'>Feedback and Suggestions</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>We’re always looking to improve. If you have suggestions or ideas to make Acta better, 
            send us a message at support@actastaffing.com. Your feedback matters to us!</Typography>
          </Text>

          <Text style={styles.headline}><Typography variant='smb'>Stay Connected</Typography></Text>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>Connect with us through Acta Staffing social media channels for updates, tips, and announcements:</Typography>
          </Text>
         <View style={styles.listContainer}>
           <Text style={styles.listItem}><Text style={{ fontWeight: "bold" }}><Typography variant='xsm'>• Facebook: </Typography></Text><Typography variant='xsm'>Acta Staffing Facebook page</Typography></Text>
           <Text style={styles.listItem}><Text style={{ fontWeight: "bold" }}><Typography variant='xsm'>• LinkedIn: </Typography></Text><Typography variant='xsm'>Acta Staffing Linkedin page</Typography></Text>
           <Text style={styles.listItem}><Text style={{ fontWeight: "bold" }}><Typography variant='xsm'>• Twitter: </Typography></Text><Typography variant='xsm'>Acta Staffing Twitter page</Typography></Text>
           <Text style={styles.listItem}><Text style={{ fontWeight: "bold" }}><Typography variant='xsm'>• Instagram: </Typography></Text><Typography variant='xsm'>Acta Staffing Instagram page</Typography></Text>
          </View>
          <Text style={styles.paragraph}>
            <Typography variant='xsm'>Your success is our priority. At Acta, we’re committed to helping you achieve a flexible and rewarding career in hospice care.</Typography>
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
export default HelpSupport

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headline: {
    marginTop: 10,
    fontSize: 20,

    marginBottom: 2,
  },
  paragraph: {
    fontSize: 15
  },
  listContainer: {
    alignItems: "flex-start",
  },
  listItem: {
    color: "#333",
    marginBottom: 7,
  },
});