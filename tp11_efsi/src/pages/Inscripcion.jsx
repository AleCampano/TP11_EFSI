import { useState } from 'react'
import { Text, ScrollView, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CampoFormulario from '../components/CampoFormulario'
import TicketConfirmacion from '../components/TicketConfirmacion'

function Inscripcion() {
  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
  })

  const [datosTicket, setDatosTicket] = useState(null)
  const [cargando, setCargando] = useState(false)

  const onSubmit = async (data) => {
    setCargando(true)

    try {
      await AsyncStorage.setItem('@ultimo_email_inscrito', data.email)
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      setDatosTicket(data)
      setCargando(false)
    }, 1000)
  }

  const handleReiniciar = () => {
    setDatosTicket(null)
    reset()
  }

  if (datosTicket) {
    return <TicketConfirmacion datos={datosTicket} onVolver={handleReiniciar} />
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Festival Sonido Sur 🎸</Text>
      <Text style={styles.subtitulo}>Formulario de Inscripción</Text>

      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'El nombre es obligatorio',
          minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' },
        }}
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Nombre Completo"
            placeholder="Ej. Juan Pérez"
            onChangeText={onChange}
            value={value}
            error={errors.nombre}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'El email es obligatorio',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email no válido',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Correo Electrónico"
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            error={errors.email}
          />
        )}
      />

      <Controller
        control={control}
        name="edad"
        rules={{
          required: 'La edad es obligatoria',
          min: { value: 12, message: 'Debes tener al menos 12 años' },
          max: { value: 99, message: 'Edad máxima 99 años' },
        }}
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Edad"
            placeholder="Ej. 22"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
            error={errors.edad}
          />
        )}
      />

      <Controller
        control={control}
        name="tipo"
        rules={{ required: 'Escribe General o VIP' }}
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Tipo de Entrada (General / VIP)"
            placeholder="General o VIP"
            onChangeText={onChange}
            value={value}
            error={errors.tipo}
          />
        )}
      />

      <Controller
        control={control}
        name="telefono"
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Teléfono (Opcional)"
            placeholder="Ej. 1123456789"
            keyboardType="phone-pad"
            onChangeText={onChange}
            value={value}
            error={errors.telefono}
          />
        )}
      />

      {cargando ? (
        <ActivityIndicator color="#16a34a" size="large" />
      ) : (
        <Button
          title="Confirmar Inscripción"
          color="#16a34a"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
  },
})

export default Inscripcion