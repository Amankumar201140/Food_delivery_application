import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

//import { useEffect, useState } from 'react'

export default function Home() {
  const[search, setSearch] =useState('');
  const[foodCat, setFoodCat]= useState([]);
   const [foodItem,setFoodItem]= useState([]);

   const loadData = async() =>{
    let response =await fetch("http://localhost:4000/api/foodData2",{
          method:"POST",
          headers:{
            'Content-Type' : 'application/json'
          }
    });
    response=await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0], response[1]);
   }

   useEffect(()=>{
    loadData()
   }, [])
 

  return (
    <div>
      <div><Navbar/></div>
      <div><div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption">
        <div className="d-flex justify-content-center">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
    {/* <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button> */}
  </div>



        </div>
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://static.onecms.io/wp-content/uploads/sites/43/2022/12/05/7245-jays-signature-pizza-crust-4x3-0805.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-093.jpg"
              alt="Secosnd slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-093.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-ride="carousel">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
          </button>
        </a>
      </div>
      </div>
      
       </div>
    <div className='container'>
      {
      foodCat !==[]
      ? foodCat.map((data)=> {
        return(
        <div className='row mb-3'>
            <div key={data._id} className="fs-3 m-3">
              {data.CategoryName}
              </div>
              <hr className='bg-primary'/>
              {foodItem !== []
              ? 
              foodItem.filter((item)=>( item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
              .map(filterItems =>{
                return (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Card foodItem ={filterItems} 
                    options={filterItems.options[0]}
                   

                    ></Card>
                  </div>
                )
              })
              : <div>No Such Items</div>}
              </div>
        )
      
      })
      : ""
    }

    </div>

   <div><Footer/></div>
    </div> 
  )
}
