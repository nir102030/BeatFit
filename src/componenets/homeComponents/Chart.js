import React from 'react';
import { Dimensions } from 'react-native';
import {LineChart} from 'react-native-chart-kit'

const Chart = ({data, color})=>{
    return(
        <LineChart
            data={data}
            width={Dimensions.get('window').width*0.95}
            height={Dimensions.get('window').height*0.25}
            chartConfig={{
            backgroundColor: '#00bde2',
            backgroundGradientFrom: '#00bde2',
            backgroundGradientTo: color,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16,
            }
            }}
            bezier
            style={{
            margin:10,
            borderRadius: 16
            }}
        />
    );

}

export default Chart;