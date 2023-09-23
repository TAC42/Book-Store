// const Router = ReactRouterDOM.HashRouter
import { Route, Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { AppFooter } from './cmps/layout/AppFooter.jsx'
import { AppHeader } from './cmps/layout/AppHeader.jsx'
import { UserMsg } from './cmps/common/UserMsg.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="layout-grid layout-rows">
          <AppHeader />
          <Routes>
            <Route element={<ToyIndex />} path="/contact" />
            <Route element={<ToyDetail />} path="/contact/:contactId" />
          </Routes>
          <AppFooter />
        </section>
      </Router>
      <UserMsg />
    </Provider>
  )
}
