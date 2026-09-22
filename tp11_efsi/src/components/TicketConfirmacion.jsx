import { View, Text, Button, StyleSheet } from 'react-native'

function TicketConfirmacion({ datos, onVolver }) {
  const { nombre, email, edad, tipo, telefono } = datos

  return (
    <View style={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.titulo}>🎵 Sonido Sur 🎵</Text>
        <Text style={styles.subtitulo}>Ticket de Confirmación</Text>

        <View style={styles.divider} />

        <Text style={styles.dato}>
          <Text style={styles.label}>Nombre: </Text>
          {nombre}
        </Text>

        <Text style={styles.dato}>
          <Text style={styles.label}>Email: </Text>
          {email}
        </Text>

        <Text style={styles.dato}>
          <Text style={styles.label}>Edad: </Text>
          {edad} años
        </Text>

        <Text style={styles.dato}>
          <Text style={styles.label}>Entrada: </Text>
          {tipo}
        </Text>

        {telefono ? (
          <Text style={styles.dato}>
            <Text style={styles.label}>Teléfono: </Text>
            {telefono}
          </Text>
        ) : null}
      </View>

      <Button title="Inscribir a otra persona" color="#16a34a" onPress={onVolver} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  ticket: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#16a34a',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#16a34a',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },
  dato: {
    fontSize: 15,
    color: '#cccccc',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
})

export default TicketConfirmacion