import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // definindo variaveis numericas
  const [mili, setMili] = useState<number>(0);
  var [milivar] = useState<number>(0);
  const [seg, setSeg] = useState<number>(0);
  var [segvar] = useState<number>(0);
  const [min, setMin] = useState<number>(0); 
  var [minvar] = useState<number>(0);
  const [hor, setHor] = useState<number>(0);
  var [horvar] = useState<number>(0);
  // definindo variaveis boleanas
  const [rodando, setRodando] = useState<boolean>(false)  
  let intervalo: NodeJS.Timeout | null = null;

  useEffect(() => {
    // variavel local ?

    if (rodando) {
      intervalo = setInterval(() => {
        milivar += 1
        setMili(milivar) ; // mudança na variavel
        if (milivar >= 60) {
          segvar += 1
          setSeg(segvar)
          milivar = 0
          setMili(milivar)
        }
        if (segvar >= 60) {
          minvar += 1
          setMin(minvar)
          segvar = 0
          setSeg(segvar)
        }
        if (minvar >= 60) {
          horvar += 1
          setHor(horvar)
          minvar = 0
          setMin(minvar)
        }
      }, 10); // delay da mudança
    } else if (intervalo) {
      clearInterval(intervalo);
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [rodando]);


    const iniciarOuPausar = () => {
      setRodando((prev) => !prev);
  };

    const zerar = () => {
      
      milivar = 0
      segvar = 0
      minvar = 0
      horvar = 0
      setMili(0)
      setSeg(0)
      setMin(0)
      setHor(0)
      if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
        
      }
      setRodando(false);
      setText('Iniciar');
    }

  // mudança de texto no botao
    const [textoBotao, setText] = useState('Iniciar');

    const mudarTextoBotao = () => {
      if (textoBotao == 'Iniciar' || textoBotao == 'Retomar') {
        setText('Pausar');
      } else if (textoBotao == 'Pausar') {
        setText('Retomar');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Cronômetro</Text>
      <Text style={styles.tempo}>{hor.toString().padStart(2, '0')}:{min.toString().padStart(2, '0')}:{seg.toString().padStart(2, '0')}:{mili.toString().padStart(2, '0')}</Text>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.botao3}>
          <Text style={styles.textoBotao3}>Zerar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={iniciarOuPausar} onPressOut={mudarTextoBotao}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={zerar}>
          <Text style={styles.textoBotao2}>Zerar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tittle: {
    fontSize: 28,
  },

  tempo: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#ADD8E680",
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  botao2: {
    backgroundColor: "#ADD8E680",
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  textoBotao2: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  container2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '80%',
  },

  botao3: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  textoBotao3: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
