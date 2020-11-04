import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'

import { Section1 } from './sections/Section1'
import { Section2 } from './sections/Section2'
import { Sidebar } from './sidebar/Sidebar'
import styles from './App.module.css'

const MyApp = () => (
    <div className={styles.container}>
        <HashRouter>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>

            <div className={styles.content}>
                <Switch>
                    <Route
                        exact
                        path="/section1"
                        component={Section1}
                    />

                    <Route
                        exact
                        path="/section2"
                        component={Section2}
                    />

                    <Redirect from="*" to="/section1" />
                </Switch>
            </div>
        </HashRouter>
    </div>
)

export default MyApp
