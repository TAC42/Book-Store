const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header layout-grid centerize">
            <div className="content">
                <span className="brand">Team Contacts</span>

                <nav>
                    <NavLink to="/team">Teams</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                </nav>
            </div>
        </header>
    )
}