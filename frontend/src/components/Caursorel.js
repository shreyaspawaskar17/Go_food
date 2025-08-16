import React from 'react'

export default function Caursorel() {
  return (
    <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id='carousel'>
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                    </form>
                </div>
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
                <div className="carousel-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcvgoS8UM7Ec3aWZeOyb7qRtR6gazeerogA&s" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
                <div className="carousel-item">
                    <img src="https://imgmediagumlet.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
  );
}
