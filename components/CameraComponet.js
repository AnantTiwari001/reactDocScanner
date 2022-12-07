import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Button,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
// import PDFKitPage from "pdfkit/js/page";
// const PDFDocument = require('pdfkit');
// import { copyAsync, documentDirectory } from "expo-file-system";

export default function App() {
  useEffect(() => {
    MediaLibrary.requestPermissionsAsync();
    requestPermission()
  }, [])
  
  const [startCamera, setStartCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraItem = useRef();
  const __startCamera = async () => {
    // console.log("hello camera");
    if (permission.status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const changeCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const pdf=()=>{
    const doc = new PDFKitImage();
    console.log(doc);
  }
  const doIt= async ()=>{
    // console.log(apple);
    let takenPhoto= await cameraItem.current.takePictureAsync()
    const asset = await MediaLibrary.createAssetAsync(takenPhoto.uri)
  }
  return (
    <SafeAreaView style={styles.container}>
      {startCamera ? (
        <View>
          <Camera style={styles.cameraStyle} ref={cameraItem} type={type}  ></Camera>
          <View style={styles.button}>
            <Button title="Change Camera" onPress={changeCamera} />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
          
        </View>
      )}
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-evenly'}} >
      <Button title="methods" onPress={doIt} />
      <Button title="pdf Function" onPress={pdf} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraStyle: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  button: {
    position: "absolute",
    bottom: 4,
  },
});
