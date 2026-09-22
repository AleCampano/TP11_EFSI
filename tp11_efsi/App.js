import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import Inscripcion from './src/pages/Inscripcion'

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Inscripcion />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
})

export default App