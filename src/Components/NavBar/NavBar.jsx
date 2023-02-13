import React from 'react'
import "./Navbar_module.css"
import { Link } from 'react-router-dom'
import GameImage from '../../Assets/Images/logo.png'

export default function NavBar({userData,logout}) {
  return (
    <>
    {console.log(userData)}
    <nav className="navbar navbar-expand-lg bg-transparent border-2 border-bottom border-dark navbar-dark">
  <div className="container">
    <Link className="navbar-brand logo-font" to="">
    <img className='img-fluid logo_game me-1' src={GameImage} alt="" />
      Game Over
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      {userData?<ul className="navbar-nav m-auto w-50">

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="">Home</Link>
</li>

<li className="nav-item">
  <Link className="nav-link" to="all">All</Link>
</li>
<li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Platforms
  </Link>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item black_link" to="platform/pc">pc</Link></li>
    <li><Link className="dropdown-item black_link" to="platform/browser">browser</Link></li>
  </ul>
</li>
<li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   Sort-by
  </Link>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item black_link" to="sortby/release-date">Release-date</Link></li>
    <li><Link className="dropdown-item black_link" to="sortby/popularity">Popularity</Link></li>
    <li><Link className="dropdown-item black_link" to="sortby/alphabetical">Alphabetical</Link></li>
    <li><Link className="dropdown-item black_link" to="sortby/relevance">Relevance</Link></li>

  </ul>
</li>

<li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   Categories
  </Link>

  <ul className="dropdown-menu">
    <li><Link className="dropdown-item black_link" to="categories/racing">Racing</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/sports">Sports</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/social">Social</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/shooter">Shooter</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/open-world">Open-world</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/zoombie">Zoombie</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/fantasy">Fantasy</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/action-rpg">Actiopn-rpg</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/action">Action</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/flight">Flight</Link></li>
    <li><Link className="dropdown-item black_link" to="categories/battle-royale">Battle-royale</Link></li>
  </ul>

</li>

</ul>:"" }
      
    </div>
   

    <div className="navbar">
      
      {userData?<> <button className="btn outline_btn mx-3" ><Link onClick={()=>logout()} className='text-decoration-none text_color' to={"login"}>Log Out</Link></button>
      </>
      :
      <>
      <h6 className='m-0 mx-3'><Link className='text-decoration-none text-muted' to={"login"}>Login</Link></h6>
      <button className="btn outline_btn mx-3" ><Link className='text-decoration-none text_color' to={"register"}>Join Free</Link></button></>
      }
      
     

    </div>
  </div>
</nav>
    </>
  )
}
