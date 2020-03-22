import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Calendar } from 'react-native-calendars';
import ProgressContext from '../../context/ProgressContext';
// import moment from 'moment';
import moment from 'moment-timezone';

const HomeScreen = ({ navigation, sessionData, goalData }) => {
    
    const { goals } = goalData;
    const { sessions } = sessionData;
    const { sample, setSample, update, getItem } = useContext(ProgressContext);
    console.log('sample', sample)
    console.log('sampelData', sample[0])
    const [goal, setGoal] = useState(360000);
    const [ num, setNum] = useState('')
    const [ today, setToday] = useState(0);

    console.log('goals', goals)
    console.log('currentTime', moment.tz("2020-03-21 14:10", "America/Vancouver").format())
    console.log('sessions',sessions)
    let changedTime = moment.tz(sessions[29].timeStart, "America/Vancouver").format();
    console.log('changedTime', changedTime)
    
    let day;
    for (let i = 0; i < goals.length; i++) {
        day = goals[i].days.title;
        console.log('day', day)
    }

    const display = () => {
        for(let i=0; i<sample.length; i++) {
            console.log('num', num)
            console.log('date', sample[i].groupedDate)
            if(sample[i].groupedDate === num){
                setToday(sample[i].diff)
                break;
            } else {
                setToday(0)
            }
        }
    }

    useEffect(() => {
        display()    
    })

    return (
        <View>
            <View style={{ backgroundColor: 'white' }}>
                <Button
                    title="Edit goals"
                    onPress={() => navigation.push('Goal')}
                />
                <Calendar
                    current={new Date()}
                    minDate={'2020-03-15'}
                    maxDate={'2020-03-21'}
                    hideExtraDays={true}
                    dayComponent={({ date, state, marking}) => {
                        // console.log('date', date)
                        // console.log('state', state)
                        // console.log('mark', marking)
                        // console.log('grouped', grouped)
                        
                        const [progress, setProgress] = useState();

                        useEffect(() => {

                            for (let i = 0; i < sample.length; i++) {
                                if (sample[i].groupedDate === date.dateString) {
                                    setProgress(sample[i].diff)
                                    break;
                                }
                            }
                            
                        }, [])
                            return (
                                <ProgressCircle
                                    percent={(progress/goal)*100}
                                    radius={15}
                                    borderWidth={3}
                                    color="green"
                                    shadowColor="#999"
                                    bgColor="white"
                                >
                                    <Text
                                        onPress={() => { 
                                            setNum(date.dateString)
                                            console.log('prog', sample)}}
                                    >
                                        {date.day}</Text>
                                </ProgressCircle>
                            )
                        
                    }}
                    monthFormat={'MMMM dd, yyyy'}
                // style={{marginTop: 30}}
                />
            </View>

            {/* <View style={{ backgroundColor: 'white' }}>
                <Button title="expand" />
            </View> */}
            <Text>Home Screen</Text>
            <ProgressCircle
                percent={today/goal*100}
                radius={50}
                borderWidth={10}
                color="green"
                shadowColor="#999"
                bgColor="white"
            >
                <Text>{/* {progress.duration + 'hours'} */}2hours</Text>
            </ProgressCircle>

            <Button
                title="Go to Activity"
                onPress={() => navigation.navigate('Activity')}

            />
            <Button
                title="Go to Onboarding"
                onPress={() => navigation.navigate('Onboarding')}

            />
            <Button
                title="Go to User Login"
                onPress={() => navigation.navigate('User')}

            />
        </View>
    );
}


export default HomeScreen;