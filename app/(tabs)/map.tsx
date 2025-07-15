import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  Pressable,
  Vibration,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { Card } from "~/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import Svg, { Circle } from "react-native-svg";
import MapViewDirections from "react-native-maps-directions";

const DEST = { latitude: 3.0535290396556385, longitude: 101.60003139693707 };

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const [region, setRegion] = useState({
    latitude: DEST.latitude,
    longitude: DEST.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [currentLoc, setCurrentLoc] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);
  const [watchSub, setWatchSub] =
    useState<Location.LocationSubscription | null>(null);
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [timeline] = useState([
    { title: "Arrived at Playground Area", description: "04:30 PM" },
    {
      title: "Arrived at Nuri Kindergarten, Johor Bahru",
      description: "11:40 AM",
    },
    { title: "Arrived at Jalan Tampoi, Johor Bahru", description: "11:35 AM" },
    {
      title: "Arrived at Skudai Highway, Johor Bahru",
      description: "11:30 AM",
    },
  ]);

  // Permission and services check
  useEffect(() => {
    const checkServices = async () => {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!servicesEnabled) {
        pauseChecking();

        Alert.alert(
          "Enable Location Services",
          "Please enable location services.",
          [
            { text: "Cancel", onPress: resumeChecking },
            {
              text: "Open Settings",
              onPress: () => {
                if (Linking.sendIntent) {
                  Linking.sendIntent(
                    "android.settings.LOCATION_SOURCE_SETTINGS"
                  );
                } else {
                  Linking.openSettings();
                }
                resumeChecking();
              },
            },
          ],
          { cancelable: false }
        );

        setLocationAvailable(false);
        return;
      }

      if (!granted) {
        pauseChecking();

        Toast.show({
          type: "error",
          text1: "Location Permission",
          text2: "Tap to enable.",
          onPress: () => {
            Linking.openSettings();
            resumeChecking();
          },
          onHide: () => {
            resumeChecking();
          },
          autoHide: true,
          visibilityTime: 4000,
        });

        setLocationAvailable(false);
        return;
      }

      setLocationAvailable(true);
    };

    const startChecking = () => {
      checkServices();
      if (intervalId.current === null) {
        intervalId.current = setInterval(checkServices, 5000);
      }
      setIsChecking(true);
    };

    const pauseChecking = () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      setIsChecking(false);
    };

    const resumeChecking = () => {
      if (intervalId.current === null) {
        checkServices(); // immediate check
        intervalId.current = setInterval(checkServices, 5000);
      }
      setIsChecking(true);
    };

    startChecking();

    return () => {
      if (intervalId.current !== null) clearInterval(intervalId.current);
    };
  }, []);

  // 2. Subscribe to location when available
  useEffect(() => {
    if (!locationAvailable) {
      watchSub?.remove();
      setWatchSub(null);
      setCurrentLoc(null);
      return;
    }

    const subscribe = async () => {
      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (loc) => {
          setCurrentLoc({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
      setWatchSub(sub);
    };

    subscribe();

    return () => {
      watchSub?.remove();
    };
  }, [locationAvailable]);

  const onMapReady = () => {
    if (mapRef.current && currentLoc) {
      mapRef.current.fitToCoordinates([currentLoc, DEST], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View className="flex-1 bg-bg">
      <View className="w-full h-1/3">
        {currentLoc ? (
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            onMapReady={onMapReady}
            showsUserLocation={true}
            zoomControlEnabled={true}
            // loadingEnabled={true}
          >
            {currentLoc && (
              <>
                {/* <Marker coordinate={currentLoc} title="You're here">
                  <Svg height={30} width={30}>
                    <Circle
                      cx={15}
                      cy={15}
                      r={8}
                      fill="#4285F4"
                      stroke="#fff"
                      strokeWidth={3}
                    />
                  </Svg>
                </Marker> */}
                <Marker coordinate={DEST} title="Destination" />

                <MapViewDirections
                  directionsServiceBaseUrl="https://maps.googleapis.com/maps/api/directions/json"
                  origin={currentLoc}
                  strokeWidth={3}
                  destination={DEST}
                  apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
                />
              </>
            )}
          </MapView>
        ) : (
          <View className="flex-1 justify-center items-center flex-col gap-7">
            <ActivityIndicator size={50} color="#0c4e80" />
            <Text className="text-word text-center font-bold text-xl">
              Locating...
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 flex-col gap-4 p-4">
        <Card className="flex-col p-5 bg-white rounded-2xl shadow-lg justify-center gap-[0.2rem]">
          <Text className="text-lg font-bold text-word">Current Location</Text>
          <Text className="font-semibold text-word">Playground Area</Text>
          <Text className="text-sm text-word">
            123 Jalan Tampoi, Tampoi, Johor Bahru, Malaysia
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-word">
              Known location since July 2025
            </Text>
            <View className="rounded-full bg-green-600 px-2 py-1">
              <Text className="text-center text-xs font-bold">Safe</Text>
            </View>
          </View>
        </Card>

        <Card className="flex-1 flex-col px-4 pt-4 bg-white rounded-2xl shadow-lg gap-4">
          <View className="flex-row items-center gap-4">
            <Text className="font-semibold text-word text-lg">
              Today's Timeline
            </Text>
            <Pressable
              onPress={() => {
                Vibration.vibrate(300);
              }}
            >
              <View className="bg-gray-100 rounded-full p-2">
                <Ionicons name="chevron-forward" size={18} color="black" />
              </View>
            </Pressable>
          </View>
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Timeline
              isUsingFlatlist={false}
              showTime={false}
              data={timeline}
              separator={false}
              circleColor="#0c4e80"
              lineColor="#0c4e80"
              titleStyle={{
                fontSize: 16,
                fontWeight: 600,
                color: "#0c4e80",
              }}
              descriptionStyle={{
                color: "#0c4e80",
              }}
              detailContainerStyle={{
                padding: 0,
                paddingBottom: 5,
                marginTop: -12,
              }}
            />
          </ScrollView>
        </Card>
      </View>
    </View>
  );
}
