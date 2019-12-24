import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './util/routes'

import { AuthProvider } from './context/Auth'
import { ContentProvider } from './context/Content'
import './styles/inlineEditStyle.css'
import { GalleryImagesProvider } from './context/Gallery'

const App = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <GalleryImagesProvider>
          <Router>
            <Nav />
            <Switch>
              {routes.map(route => (
                <Route key={route.path} path={route.path} exact={route.exact} component={route.main} />
              ))}
            </Switch>
          </Router>
        </GalleryImagesProvider>
      </ContentProvider>
    </AuthProvider>
  )
}

export default App
