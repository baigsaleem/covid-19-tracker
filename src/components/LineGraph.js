import React from 'react'
import { Line } from 'react-chartjs-2';

export default function LineGraph(props) {
    return (
        <div style={{
            width: '600px',
            height: '600px',
            margin: '0 auto'
        }}>
            <Line data={{
                labels: props.label.map(l => l.substr(0, 10)),
                datasets: [
                    {
                        label: 'Cases',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgb(63,81,181,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgb(63,81,181,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgb(63,81,181,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: props.yAxis
                    }
                ]
            }} />
        </div>
    )
}