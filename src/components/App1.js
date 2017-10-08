import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

import values from '../data'

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: ['t1', 't2', 't3'],
                datasets: [
                    {
                        label: 'readings',
                        data: [
                            0, 0, 0
                        ],
                        backgroundColor: 'purple'
                    }
                ]
            }
        }
    }
    componentDidMount() {
        values().on('value', val => {
            // console.log(val.val())
            let result = Object.keys(val.val()).map( key => {
                return [val.val()[key]]
            })
            let last = result
            console.log(last)
            // console.log(typeof last.flow)
            // console.log([last.flow, last.moisture, last.water])
            this.setState({chartData: 
                {
                labels: last.map(l => l[0].time),
                datasets: [
                    {
                        label: 'readings',
                        data: last.map(l => l[0].flow),
                        backgroundColor: 'purple'
                    }
                ]
            }
            })
        })
    }
    render() {
        return (
            <div className="chat" height="300px">
                <Line
                    data={this.state.chartData}
                    height={500}
                    options={{
                        title:{
                            display: true,
                            text: 'Sensor Readings',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        maintainAspectRatio: false,
                        }}
                />
            </div>
        )
    }
}