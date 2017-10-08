import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App1 from './App1'
import Chart from './Chart'
import App2 from './App2'
import App3 from './App3'
import App4 from './App4'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Chart} />
            <Route exact path='/moisture' component={App2} />
            <Route exact path='/flow' component={App1} />
            <Route exact path='/water' component = {App3}/>
            <Route exact path='/turbidity' component = {App4}/>
        </Switch>
    </main>
)

export default Main