import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a className="waves-effect waves-light btn-small">
          <i className="material-icons left">cloud_queue</i>°C
        </a>
        <a className="waves-effect waves-light btn-small">
          <i className="material-icons right">cloud_queue</i>°F
        </a>

        <a href="#!" className="brand-logo">
          <i className="material-icons">cloud</i> Hampster wheatur
        </a>
      </div>
    </nav>
  )
}
