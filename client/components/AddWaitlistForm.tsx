import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Text, View, TextInput } from './Themed'
import { FontAwesome } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { SAVE_CUSTOMER } from '../constants/GraphQL.queries'

const defaultValues = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  notes: '',
  metaData: {
    avatarColor: '',
    startTime: '',
    endTime: '',
    ticketNumber: '',
  },
}

export default function AddWaitlistForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues })
  const [saveCustomer, { error }] = useMutation(SAVE_CUSTOMER)
  const [success, setSuccess] = React.useState(false)

  const onSubmit = (data: any) => {
    const avatarColor = Math.floor(Math.random() * 5)
    const formData = { ...defaultValues, ...data }
    formData.metaData.avatarColor = avatarColor
    formData.contactNumber = Number(data.contactNumber)
    reset(defaultValues)
    // saveCustomer({ variables: { customerData: formData } })

    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1500)
    }
  }

  const onChange = (arg: { nativeEvent: { text: any } }) => {
    return {
      value: arg.nativeEvent.text,
    }
  }

  // console.log('errors', errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name *</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            lightColor='#fff'
            darkColor='#fff'
          />
        )}
        name='firstName'
        rules={{ required: true }}
      />
      {errors.firstName && <Text style={styles.required}>This is required!</Text>}

      <Text style={styles.label}>Last name *</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            lightColor='#fff'
            darkColor='#fff'
          />
        )}
        name='lastName'
        rules={{ required: true }}
      />
      {errors.lastName && <Text style={styles.required}>This is required!</Text>}

      <Text style={styles.label}>Contact Number *</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            lightColor='#fff'
            darkColor='#fff'
            keyboardType='numeric'
          />
        )}
        name='contactNumber'
        rules={{ required: true }}
      />
      {errors.contactNumber && <Text style={styles.required}>This is required!</Text>}

      <Text style={styles.label}>Notes</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            multiline={true}
            numberOfLines={4}
            lightColor='#fff'
            darkColor='#fff'
          />
        )}
        name='notes'
        rules={{ required: false }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} activeOpacity={0.7}>
        <Text style={styles.text}>Add to Waitlist</Text>
      </TouchableOpacity>

      <Modal isVisible={success} onBackdropPress={() => setSuccess(false)}>
        <View style={styles.modal}>
          <FontAwesome size={40} style={{ alignSelf: 'center' }} name='check' color={'green'} />
          <Text style={styles.success}>Successfully Added to Waitlist!</Text>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    margin: 15,
    marginLeft: 0,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ff005d',
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '90%',
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  required: {
    color: 'red',
  },
  success: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 5,
  },
  modal: {
    height: 120,
    width: 200,
    padding: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
})
