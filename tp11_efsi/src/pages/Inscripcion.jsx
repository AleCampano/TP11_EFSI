import { useState } from 'react'
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet } from 'react-native'
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
      <Text style={styles.titulo}>Festival Sonido Sur Schettano67 PROD. 🎸</Text>
      <Text style={styles.subtitulo}>Formulario de Inscripción</Text>

      {/* Nombre: Solo letras y mínimo 3 caracteres */}
      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'El nombre es obligatorio',
          minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' },
          maxLength: {value: 20, message: 'Debe tener menos de 20 caracteres'},
          pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'Solo se permiten letras',
          },
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

      {/* Email: Formato correcto con @ y . */}
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

      {/* Edad: Solo números, entre 1 y 100 */}
      <Controller
        control={control}
        name="edad"
        rules={{
          required: 'La edad es obligatoria',
          min: { value: 1, message: 'La edad mínima es 1' },
          max: { value: 100, message: 'La edad máxima es 100' },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
          },
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

      {/* Teléfono: Obligatorio, exactamente 10 números */}
      <Controller
        control={control}
        name="telefono"
        rules={{
          required: 'El teléfono es obligatorio',
          pattern: {
            value: /^\d{10}$/,
            message: 'Debe ingresar exactamente 10 números',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <CampoFormulario
            label="Teléfono (10 números)"
            placeholder="Ej. 1123456789"
            keyboardType="phone-pad"
            onChangeText={onChange}
            value={value}
            error={errors.telefono}
          />
        )}
      />

      {/* Tipo de entrada: Selección con 2 botones */}
      <Controller
        control={control}
        name="tipo"
        rules={{ required: 'Debes seleccionar un tipo de entrada' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorLabel}>Tipo de Entrada</Text>
            <View style={styles.botonesRow}>
              <View style={styles.btnTipo}>
                <Button
                  title="General"
                  color={value === 'General' ? '#16a34a' : '#333333'}
                  onPress={() => onChange('General')}
                />
              </View>
              <View style={styles.btnTipo}>
                <Button
                  title="VIP"
                  color={value === 'VIP' ? '#16a34a' : '#333333'}
                  onPress={() => onChange('VIP')}
                />
              </View>
            </View>
            {errors.tipo && <Text style={styles.errorText}>{errors.tipo.message}</Text>}
          </View>
        )}
      />

      {cargando ? (
        <ActivityIndicator color="#16a34a" size="large" style={{ marginTop: 15 }} />
      ) : (
        <View style={{ marginTop: 15 }}>
          <Button
            title="Confirmar Inscripción"
            color="#16a34a"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>
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
  selectorContainer: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  botonesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  btnTipo: {
    flex: 1,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 6,
  },
})

export default Inscripcion