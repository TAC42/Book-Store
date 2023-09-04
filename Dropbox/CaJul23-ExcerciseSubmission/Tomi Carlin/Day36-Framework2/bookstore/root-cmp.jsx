const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./pages/about.jsx"
import { BookIndex } from "./pages/book-index.jsx"
import { Home } from "./pages/home.jsx"
import { BookDetails } from "./pages/book-details.jsx"
import { BookEdit } from "./pages/book-edit.jsx"
import { AddReview } from "./cmps/add-review.jsx"
import { ReviewList } from "./cmps/review-list.jsx"

export function App() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book/:bookId" element={<BookDetails />} >
                            <Route path="/book/:bookId/view-reviews" element={<ReviewList />} />
                            <Route path="/book/:bookId/add-review" element={<AddReview />} />
                        </Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book" element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
} 