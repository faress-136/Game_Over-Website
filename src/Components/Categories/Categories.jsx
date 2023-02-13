import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Item from '../Item/Item'
import Loading from '../Loading/Loading'

export default function Categories() {

let {cat} = useParams()
let [allGames,setAllGames] = useState([])
let [isLoading,setIsLoading] = useState(false)
let [src,setsrc] = useState(false)
let [gamesCount,setGamesCount] = useState(20)


function pagination(){
    setGamesCount((previouValue)=>(previouValue+=20))
}

async function getAllGames(){
    setIsLoading(true)
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
    {
    headers: {
      'X-RapidAPI-Key': '4f1c54e50dmshf91ed5579504681p1d01aajsna895d78fad75',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    },
    })
    setAllGames(data)
    setIsLoading(false)
    // console.log(allGames.length)
}


useEffect(()=>{
    getAllGames()
},[cat,setGamesCount])

  return (
    <>
    <section>
    <Helmet>
    <title>Category: {cat}</title>
    </Helmet>
        <div className="container my-5">
        <div className="row g-4">
          {isLoading && <Loading/>}
          {!isLoading && <>
            {allGames.slice(0,gamesCount)?.map((game,id)=>(<Item key={id} data={game} src={src}/>))}
            {allGames.length > 20 ?  <div className="pagination mt-4 d-flex justify-content-center align-items-center">
            <button onClick={()=>pagination()} className='btn btn-outline-secondary'>More Games</button>
            </div>: ""
}
          </>}
         
        </div>
     
       
       </div>


    </section>
    </>
  )
}
