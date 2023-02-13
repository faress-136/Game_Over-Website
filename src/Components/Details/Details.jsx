import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Details_module.css'

export default function Details() {

  let {id} = useParams()
  // console.log(id);

  let [gameDetails,setGameDetails] = useState([])
  let [screenshots,setScreenshots] = useState([])
  let [isLoading,setIsLoading] = useState(true)

  async function getGameDetails(){
    setIsLoading(true)
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    {
      headers: {
        "X-RapidAPI-Key":
          "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    })
    console.log(data)
    setGameDetails(data)
    setScreenshots(data.screenshots)
    setIsLoading(false)
  }

useEffect(()=>{
  getGameDetails()
},[])

  return (
   <section className='position-relative'>
    {isLoading && <Loading/>}
    {!isLoading && <>

      <img className='w-100 img-fluid' src={`https://www.freetogame.com/g/${id}/background.jpg`?`https://www.freetogame.com/g/${id}/background.jpg`:""} alt="" />
    <div className="layer position-absolute top-0 bottom-0 end-0 start-0"></div>
      <div className="container position-absolute  top-0 start-0 bottom-0 end-0 pt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="media_items position-relative">
              <video typeof='video/webm' className='img-fluid position-relative rounded' muted autoPlay src={`https://www.freetogame.com/g/${id}/videoplayback.webm` ? `https://www.freetogame.com/g/${id}/videoplayback.webm`:""}></video>
              <img className='w-100 rounded position-absolute game_thumbnail top-0 start-0' src={`https://www.freetogame.com/g/${id}/thumbnail.jpg`?`https://www.freetogame.com/g/${id}/thumbnail.jpg`:""} alt="" />
            </div>

            <div className="row">
              <div className="buttons d-flex justify-content-between align-items-center">
              <div className="col-md-3">
                <span className='text-center btn btn-dark my-2 py-2 px-3 text_gray'>FREE</span>
              </div>

              <div className="col-md-9">
                <a className='btn btn_blue w-100' href={gameDetails?.freetogame_profile_url}> <strong>PLAY NOW</strong> <i className='fas fa-sign-out-alt'></i> </a>
              </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h1 className='mb-3'>{gameDetails?.title}</h1>
            <h5 className='my-2'>About {gameDetails?.title}</h5>
            <p className='fs-5'>{gameDetails.description}</p>

            {gameDetails.minimum_system_requirements ? <>
              <div className="min_requirments mt-4 pb-4">
              <h4 className='fw-bold'>Minimum System Requirements</h4>
              <div className="specfications px-2">
              <h5>Graphics : {gameDetails.minimum_system_requirements.graphics}</h5>
              <h5>Memory : {gameDetails.minimum_system_requirements.memory}</h5>
              <h5>OS : {gameDetails.minimum_system_requirements.os}</h5>
              <h5>Processor : {gameDetails.minimum_system_requirements.processor}</h5>
              <h5>Storage : {gameDetails.minimum_system_requirements.storage}</h5>
              </div>
            </div>
            </>:<div className='pb-4'></div>}
           

            <h4 className='mb-2'>{gameDetails?.title} Screenshots</h4>

            <div className="screenshots">

              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {screenshots?.map((screenshot,id)=>(
                    <div key={id} className="carousel-item active">
                      <img src={screenshot.image}  className="d-block w-100" alt="..."/>
                    </div>
                  ))}
                    
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
            </div>

            <div className="extra_info mt-4">
              <h2>Additional Information</h2>

              <div className="row px-2 my-3">
                <div className="col-md-4">
                  <span className='text-muted'>Title</span>
                  <p>{gameDetails?.title}</p>
                </div>

                <div className="col-md-4">
                  <span className='text-muted'>Developer</span>
                  <p>{gameDetails?.developer}</p>
                </div>

                <div className="col-md-4">
                  <span className='text-muted'>Publisher</span>
                  <p>{gameDetails?.publisher}</p>
                </div>

                <div className="col-md-4">
                  <span className='text-muted'>Release Date</span>
                  <p>{gameDetails?.release_date}</p>
                </div> <div className="col-md-4">
                  <span className='text-muted'>Genre</span>
                  <p>{gameDetails?.genre}</p>
                </div> <div className="col-md-4">
                  <span className='text-muted'>Platform</span>
                  <p><i className='fas fa-window-maximize text-muted'></i> {gameDetails.platform}</p>
                </div>


              </div>

            </div>

          </div>
        </div>

      </div>
    
    </>}
    
   </section>
  )
}
