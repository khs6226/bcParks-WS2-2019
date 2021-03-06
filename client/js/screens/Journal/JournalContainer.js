import React from "react"
import { withNavigation } from 'react-navigation';
import Journal from "./Journal"

const JournalContainer = ({ navigation, route }) => {
    return (
        <Journal
            navigation={navigation}
            params={route.params}
        />
    )
}

export default withNavigation(JournalContainer);