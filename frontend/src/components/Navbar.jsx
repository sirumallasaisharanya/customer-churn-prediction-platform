function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="brand-logo">
                    CR
                </div>

                <div>
                    <h2>CustomerRisk AI</h2>
                    <span>Intelligent Customer Analytics</span>
                </div>
            </div>

            <div className="navbar-status">
                <span className="status-dot"></span>
                AI System Online
            </div>
        </nav>
    );
}

export default Navbar;