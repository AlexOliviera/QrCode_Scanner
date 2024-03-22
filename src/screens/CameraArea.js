import { CameraView, Camera, useCameraPermissions} from 'expo-camera/next';
import { StyleSheet, View, Image, TouchableOpacity, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

const cameraIcon = require('../../assets/trocar_camera.png');

export default function CameraArea() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
 
  if (!permission) {
    requestPermission();
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
 
  //expo acanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };
  
      getCameraPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  //Fim expo scanner  

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <TouchableOpacity onPress={toggleCameraFacing}>
          <Image source={cameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
      </CameraView>

      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Toque para digitalizar novamente"} onPress={() => setScanned(false)} />
      )}
      
      <StatusBar styles="auto" />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '90%',
    height: '70%',
  },
  cameraIcon: {
    width: 80,
    height: 80,
    margin: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

});
