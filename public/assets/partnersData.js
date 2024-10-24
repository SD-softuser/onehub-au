import { TelstraImg } from "./telstra/Telstra"
import { JBhifiImg } from "./jbhifi/JBhifi"
import { OptusImg } from "./optus/Optus"
export const partnersData = [
    {
        name : "Telstra",
        checked: "../public/assets/telstra/TelstraChecked.png",
        unchecked: "../public/assets/telstra/TelstraUnchecked.png",
        banners: TelstraImg 
    },
    {
        name: "JB HiFi",
        checked: "../public/assets/jbhifi/JBHifiChecked.png",
        unchecked: "../public/assets/jbhifi/JBHifiUnchecked.png",
        banners: JBhifiImg
    },
    {
        name: "Optus",
        checked: "../public/assets/optus/OptusChecked.png",
        unchecked: "../public/assets/optus/OptusUnchecked.png",
        banners: OptusImg 
    },
]