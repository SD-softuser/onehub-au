import { TelstraImg } from "./telstra/Telstra"
import { JBhifiImg } from "./jbhifi/JBhifi"
import { OptusImg } from "./optus/Optus"
export const partnersData = [
    {
        name : "Telstra",
        checked: "../assets/telstra/TelstraChecked.png",
        unchecked: "../assets/telstra/TelstraUnchecked.png",
        banners: TelstraImg 
    },
    {
        name: "JB HiFi",
        checked: "../assets/jbhifi/JBHifiChecked.png",
        unchecked: "../assets/jbhifi/JBHifiUnchecked.png",
        banners: JBhifiImg
    },
    {
        name: "Optus",
        checked: "../assets/optus/OptusChecked.png",
        unchecked: "../assets/optus/OptusUnchecked.png",
        banners: OptusImg 
    },
]