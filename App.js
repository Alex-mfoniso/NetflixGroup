import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StarterPage from "./src/screens/StarterPage";
import OnboardingSlides from "./src/screens/OnBoardingSlides";
import NetworkStatus from "./src/components/NetworkStatus";
import HeaderTitle from "./src/components/HeaderTitle";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ProfileSelection from "./src/screens/ProfileSelection";
import Home from "./src/screens/Home";
import Download from "./src/components/Download";
import Search from "./src/components/Search";
import NewHot from "./src/screens/NewHot";
import MyNetflix from "./src/screens/MyNetflix";
import AppSettings from "./src/screens/AppSettings";
import ManageProfiles from "./src/screens/ManageProfiles";
import MyList from "./src/screens/MyList";
import Notifications from "./src/screens/Notifications";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Starter">
        <Stack.Screen
          name="Starter"
          component={StarterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Slides"
          component={OnboardingSlides}
          options={{
            headerLeft: () => false,
            headerBackVisible: false,
            headerTitle: () => <HeaderTitle />,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSelection"
          component={ProfileSelection}
          options={{
            headerShown: true,
            headerTitle: "Profile Selection",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#141414" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Download"
          component={Download}
          options={{
            headerShown: true,
            headerTitle: "Download",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#141414" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: true,
            headerBackVisible: true,
            headerTitle: "Search",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#141414" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NewHot"
          component={NewHot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyNetflix"
          component={MyNetflix}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageProfiles"
          component={ManageProfiles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppSettings"
          component={AppSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyList"
          component={MyList}
          options={{
            headerShown: true,
            headerTitle: "My List",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#141414" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: true,
            headerTitle: "Notifications",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#141414" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
      {/* <NetworkStatus /> */}
    </NavigationContainer>
  );
}

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import StarterPage from "./src/screens/StarterPage";
// import OnboardingSlides from "./src/screens/OnBoardingSlides";
// import NetworkStatus from "./src/components/NetworkStatus";
// import HeaderTitle from "./src/components/HeaderTitle";
// import SignIn from "./src/screens/SignIn";
// import SignUp from "./src/screens/SignUp";
// import ProfileSelection from "./src/screens/ProfileSelection";
// import Home from "./src/screens/Home";
// import Download from "./src/components/Download";
// import Search from "./src/components/Search";
// import NewHot from "./src/screens/NewHot";
// import MyNetflix from "./src/screens/MyNetflix";
// import AppSettings from "./src/screens/AppSettings";
// import ManageProfiles from "./src/screens/ManageProfiles";
// import MyList from "./src/screens/MyList";
// import Notifications from "./src/screens/Notifications";
// import GeofenceModal from "./src/components/GeofenceModal";
// import { useGeofence } from "./src/components/UseGeofence";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const { isWithinBounds, distance } = useGeofence();

//   return (
//     <NavigationContainer>
//       {/* Show GeofenceModal if user is outside of bounds */}
//       <GeofenceModal visible={!isWithinBounds} distance={distance} />
//       {/* Only render the navigator if the user is within bounds */}
//       {isWithinBounds && (
//         <Stack.Navigator initialRouteName="Starter">
//           <Stack.Screen
//             name="Starter"
//             component={StarterPage}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Slides"
//             component={OnboardingSlides}
//             options={{
//               headerLeft: () => false,
//               headerBackVisible: false,
//               headerTitle: () => <HeaderTitle />,
//             }}
//           />
//           <Stack.Screen
//             name="SignIn"
//             component={SignIn}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ProfileSelection"
//             component={ProfileSelection}
//             options={{
//               headerShown: true,
//               headerTitle: "Profile Selection",
//               headerTitleAlign: "center",
//               headerStyle: { backgroundColor: "#141414" },
//               headerTintColor: "white",
//             }}
//           />
//           <Stack.Screen
//             name="Download"
//             component={Download}
//             options={{
//               headerShown: true,
//               headerTitle: "Download",
//               headerTitleAlign: "center",
//               headerStyle: { backgroundColor: "#141414" },
//               headerTintColor: "white",
//             }}
//           />
//           <Stack.Screen
//             name="Search"
//             component={Search}
//             options={{
//               headerShown: true,
//               headerTitle: "Search",
//               headerTitleAlign: "center",
//               headerStyle: { backgroundColor: "#141414" },
//               headerTintColor: "white",
//             }}
//           />
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="NewHot"
//             component={NewHot}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="MyNetflix"
//             component={MyNetflix}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ManageProfiles"
//             component={ManageProfiles}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="AppSettings"
//             component={AppSettings}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="MyList"
//             component={MyList}
//             options={{
//               headerShown: true,
//               headerTitle: "My List",
//               headerTitleAlign: "center",
//               headerStyle: { backgroundColor: "#141414" },
//               headerTintColor: "white",
//             }}
//           />
//           <Stack.Screen
//             name="Notifications"
//             component={Notifications}
//             options={{
//               headerShown: true,
//               headerTitle: "Notifications",
//               headerTitleAlign: "center",
//               headerStyle: { backgroundColor: "#141414" },
//               headerTintColor: "white",
//             }}
//           />
//         </Stack.Navigator>
//       )}
//       <NetworkStatus />
//     </NavigationContainer>
//   );
// }
