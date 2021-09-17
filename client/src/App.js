import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DisplayHomePage from './pages/DisplayHomePage'
import AddCustomer from './pages/AddCustomer'
import { WaitlistProvider } from './context'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { grey, red } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: red[700],
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WaitlistProvider>
        <Router>
          <Layout>
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + '/'}>
                <DisplayHomePage />
              </Route>
              <Route path={process.env.PUBLIC_URL + '/addcustomer'}>
                <AddCustomer />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </WaitlistProvider>
    </ThemeProvider>
  )
}

export default App