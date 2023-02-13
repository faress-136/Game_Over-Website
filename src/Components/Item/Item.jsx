import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import thumbnail from '../../Assets/Images/thumbnail.jpg'


export default function Item({data,src}) {
  return (
    <>
     <div className={src? "col-md-4": "col-md-3"}>
          <div className="card border-0 bg_gray cr_pointer rounded">
          <Link to={`/details/${data.id}`}>
            <img src={data.thumbnail} className="card-img-top img-fluid" alt="..."/>
            <div className="card-body">
              <div className="inner d-flex justify-content-between align-items-center">
              {src?<h3 className="card-text p-1">{data.title}</h3>:<h5 className="card-text p-1 fw-bold">{data.title.slice(0,15)}{(data.title.length > 15)?"....":""}</h5>}
              
              <span className='badge price_badge p-2'>FREE</span>
              </div>
              {!src && <>
                <p className='text_gray fs-6'>{(data.short_description.split(" ").splice(0,3).join(" ").length < 18)?data.short_description.split(" ").splice(0,4).join(" "):data.short_description.split(" ").splice(0,2).join(" ")}....</p>
              <div className="icons_section d-flex justify-content-between align-items-center ">
                <i className='fas fa-plus-square fs-5'></i>
                <div>
                <span className='badge bg-secondary rounded-pill text-dark me-2'>{data.genre}</span>
                {data.platform == "PC (Windows)"? <i className='fab fa-windows text-muted stretched-link'></i>:<i className='fas fa-window-maximize text-muted stretched-link'></i>}
                </div>

              </div>
              </>}
              
            </div>
          
            </Link>

          </div>
          </div>
    </>
  )
}
