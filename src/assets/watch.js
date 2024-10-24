import NotChargingIcon from "./icons/NotChargingIcon.png"
import HardSetIcon from "./icons/HardSetIcon.png"
import NetworkWifiIcon from "./icons/NetworkWifiIcon.png"
import connectiveWifiNetworkIcon from "./icons/NetworkConnectivityIcon.png"
import storeHubIcon from "./icons/StoreHoursIcon.png"
import NoCharging1 from "./answers/watch/Watch not powered or not charging 1.png"
import NoCharging2 from "./answers/watch/Watch not powered or not charging 2.png"
import NoCharging3 from "./answers/watch/Watch not powered or not charging 3.png"
import factoryReset from "./answers/watch/Watch factory reset.png"
import reinstallingDemo from "./answers/watch/Watch reinstalling demo.png"
import correctSecurityMounts from "./answers/watch/Watch correct security mounts.png"

export const watchData = [{
    question: "Correct Security Mounts",
    answer: [correctSecurityMounts],
    icon: NotChargingIcon,
},
{
    question: "No Power/Not Charging",
    answer: [NoCharging1, NoCharging2, NoCharging3],
    icon: HardSetIcon,
},
{
    question: "Factory Reset",
    answer: [factoryReset],
    icon: NetworkWifiIcon,
},
{
    question: "Reinstalling Demo",
    answer: [reinstallingDemo],
    icon: connectiveWifiNetworkIcon,
},
{
    question: "PQ2 Install Videos",
    answer: [reinstallingDemo],
    icon: storeHubIcon,
},
]