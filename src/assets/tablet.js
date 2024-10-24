import StartDemo from "./answers/StartDemo.png"
import NotChargingIcon from "./icons/NotChargingIcon.png"
import HardSetIcon from "./icons/HardSetIcon.png"
import NetworkWifiIcon from "./icons/NetworkWifiIcon.png"
import connectiveWifiNetworkIcon from "./icons/NetworkConnectivityIcon.png"
import storeHubIcon from "./icons/StoreHoursIcon.png"
import updateTimeZone from "./answers/tablet/Tablet update time zone.png"
import hardReset from "./answers/tablet/Tablet hard reset.png"
import connectingToWifiNetwork from "./answers/tablet/Tablet Connecting to wifi network.png"
import updateStoreHours from "./answers/tablet/Tablet update store hours.png"

export const tabletData = [{
    question: "How to Start Demo",
    answer: [StartDemo],
    icon: NotChargingIcon,
},
{
    question: "Hard Reset",
    answer: [hardReset],
    icon: HardSetIcon,
},
{
    question: "Connecting to WiFi Network",
    answer: [connectingToWifiNetwork],
    icon: NetworkWifiIcon,
},
{
    question: "Update Time Zone",
    answer: [updateTimeZone],
    icon: connectiveWifiNetworkIcon,
},
{
    question: "Updating Store Hours",
    answer: [updateStoreHours],
    icon: storeHubIcon,
},
]