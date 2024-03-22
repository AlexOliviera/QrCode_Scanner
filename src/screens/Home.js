import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('CameraArea')}
                style={styles.button}
            >
                <Text style={styles.textButton}>Câmera</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#90ee90',
        width: '60%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 15,
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
});