import { Image, Switch, TouchableOpacity,View, Text } from 'react-native'
import React, {useState} from 'react'
import WelcomeButton from './WelcomeButton'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

const AppointmentCard = () => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{padding:10 , backgroundColor:"E1E9EE", borderRadius:20}}>
        <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
            <Image style={{width:100, height:100, borderRadius: 25}} source={require('../../assets/care1.jpg')} />
            <View style={{gap:5}}>
                <Text style={{ fontSize:15, fontWeight:'bold' ,  color:"#91ACBF"}}>October 20, 2024, 10:30 PM</Text>
                <Text style={{ color:"#91ACBF"}}>City Pet Clinic</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Switch value={isEnabled} onValueChange={toggleSwitch} thumbColor={isEnabled ? '#91ACBF' : '#E1E9EE'} trackColor={{false: '#E1E9EE', true: '#E1E9EE'}}/>
            <Text style={{color:"#91ACBF", fontWeight:'500'}}>1 Hour reminder</Text>
            </View>
            <WelcomeButton text={"Reschedule"} color={"#64C5B7"} height={35} width={100}/>
        </View>
    </View>
  )
}

export default AppointmentCard