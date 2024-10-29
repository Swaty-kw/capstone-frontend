import { View, Text } from 'react-native'
import React from 'react'
import BookingAppointment from '../components/BookingAppointment'
import CalanderButton from '../components/CalanderButton'
import Submitbutton from "../components/Submitbutton"
import AppointmentTimeCard from '../components/AppointmentTimeCard'

const BookingScreen = () => {
  return (
    <View style={{flex: 1}}>
      <BookingAppointment 
        clinicName="Happy Paws Clinic"
        location="Near Central Mall"
        address="123 Main Street, New Delhi"
        rating="4.5"
        reviews="3500"
        distance="10"
        bottomViewColor="#7AC74F"
      >
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <CalanderButton color='#CDF7F6' />
          <Submitbutton/>
        </View>
        <View>
            <AppointmentTimeCard/>
        </View>
      </BookingAppointment>
    </View>
  )
}

export default BookingScreen