import React from 'react'
import './Home_module.css'
import backgroungImg from '../../Assets/Images/BgImg.png'
import { Link } from 'react-router-dom'
import Item from '../Item/Item'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Loading/Loading'
import {Helmet} from 'react-helmet'

export default function Home() {
  const apiData = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {'sort-by': 'popularity'},
    headers: {
      'X-RapidAPI-Key': '4f1c54e50dmshf91ed5579504681p1d01aajsna895d78fad75',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  }

let [games,setGames] = useState([])
let [isLoading,setIsLoading] = useState(false)
let [src,setsrc] = useState(true)


async function getData(){
  setIsLoading(true)
  let{data} =  await axios.request(apiData)
  console.log(data);
  setGames(data)
  setIsLoading(false)
}

useEffect(()=>{
  getData()
},[])

  return (
    <>
    <Helmet>
    <title>Home Page</title>
    </Helmet>
    <section className='home'>
      <div className="container text-center">
        <h1 className='mb-2'>Find & track the best <span className='font_color'>free-to-play</span> games!</h1>
        <p className='text-muted fs-5'>Track what you've played and search for what to play next! Plus get free premium loot! </p>
        <button className='btn btn-outline-secondary'><Link className='btn_no_hover' to={'/all'}>Browse Games</Link></button>
      </div>
    </section>


    <section>
      <div className="container my-5">
       <div className="title_games d-flex">
        <i className='fas fa-robot mr-2 fs-3 me-2'></i>
        <h3> Personalized Recommendations</h3>
        </div>


        <div className="container mt-5">
        <div className="row">
          {isLoading && <Loading/>}
          {!isLoading && <>
            {games.slice(0,3)?.map((game,id)=>(<Item key={id} data={game} src={true}/>))}

          </>}
         
        </div>


       </div>

      </div>

    </section>
    </>
  )
}
