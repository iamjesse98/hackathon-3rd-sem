import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import CommunicationVoicemail from 'material-ui/svg-icons/communication/voicemail'

import values from '../data'

const fixedTop = {
  position: 'fixed',
  top: '10%',
  left: '95%'
}

function speak(txt) {
    let msg = new SpeechSynthesisUtterance()
    let voices = window.speechSynthesis.getVoices()
    msg.voice = voices["Microsoft Zira Desktop - English (United States)"]
    msg.rate = 1
    msg.pitch = 1
    msg.text = txt
    
    speechSynthesis.speak(msg)
}

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            turbidity: 0,
            moisture: 0,
            water: 0,
            flow: 0,
            chartData: {
                labels: ['flow', 'moisture', 'water', 'turbidity'],
                datasets: [
                    {
                        label: 'readings',
                        data: [
                            0, 0, 0, 0
                        ],
                        backgroundColor: [
                            'purple',
                            'deeppink',
                            'tomato',
                            'pink'
                        ]
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
            let last = result[result.length-1][0]
            console.log(typeof last.flow)
            console.log([last.flow, last.moisture, last.water, last.turbidity])
            this.setState({chartData: 
                {
                labels: ['flow', 'moisture', 'water', 'turbidity'],
                datasets: [
                    {
                        label: 'readings',
                        data: [last.flow, last.moisture, last.water, last.turbidity],
                        backgroundColor: [
                            'purple',
                            'deeppink',
                            'tomato',
                            'pink'
                        ]
                    }
                ]
            },
            turbidity: last.turbidity,
            moisture: last.moisture,
            water: last.water,
            flow: last.flow
            })
        })
    }
    render() {
        return (
            <div className="chat" height="300px">
                <Bar
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
                <FloatingActionButton onClick={() => speak(`Water is flowing at the rate of ${this.state.flow}cube centimeters per second, moisture is ${this.state.moisture}, water level is ${this.state.water}, turbidity is ${this.state.turbidity} and ${this.state.turbidity > 600 && 'The water is consumable'} ${ (500 < this.state.turbidity && this.state.turbidity < 600) && 'the water can be used for household purposes'} ${ this.state.turbidity < 500 && 'the water is non consumable' }`)} secondary={true} style={fixedTop}>
            <CommunicationVoicemail />
        </FloatingActionButton>
            </div>
        )
    }
}