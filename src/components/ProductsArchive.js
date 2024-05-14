import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { serverDomain } from '../credentials.js';
import axios from 'axios';

export default function ProductsArchive(props) {
  const itemStatusData = props.itemStatus;
  const [filter, setFilter]=useState({})
  const [id,setId] = useState("")

  const {name} = useParams();
  let catId = "";
  let dataFilter = {}
  useEffect(()=>{
    if(name){
      catId = name.replace(':', '');
      setId(catId)
      dataFilter['categoryId']=id;
    }
  })

useEffect(()=>{
  if(itemStatusData!=undefined && itemStatusData[0].veg===true){
    dataFilter['veg']=true;
    setFilter(dataFilter)  
  }
  else if(itemStatusData!=undefined && itemStatusData[0].veg===false){
    dataFilter['veg']=false;
    setFilter(dataFilter)
  }
},[props.itemStatus])

useEffect(()=>{
  setFilter(dataFilter)
}, [id])

 const [data, setData]= useState([])
  const getProducts = ()=>{
    // setFilter(dataFilter)
    // console.log(filter)
    axios({
      url: `${serverDomain}/product/view/`,
      method: "post",
      data: filter

    }).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
        // console.log(err)
      // setMessage("There is an error fetching data, plesse try again later")
    })
  }

 

  useEffect(()=>{
    getProducts()
  },[filter])

  
  const sort = (e)=>{
    console.log(e.target.value)
  }

  const showProducts = ()=>{
    if(data.length>0){
      return(
        data.map((item, index)=>{
          const url = `http://localhost:3001/images/uploads/products/${item.featuredImage}`
          return(
            <div key={index} className="col-lg-4 col-md-6 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <Link to={`/product/:${item._id}`}>
                    <div class="image-wrap" style={{background: `url(${url})` }}></div>
                  </Link>
                  {item.salePrice?(
                    <span className="sale-icon">{Math.round(((item.price-item.salePrice)/item.price)*100)+"%"}</span>
                  ): (<div></div>)}
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      {item.veg==true?(
                         <img src="./assets/images/veg.png" alt="veg icon" />
                      ): ( <img src="./assets/images/non-veg.png" alt="veg icon" />)}
                    </div>
                    <Link to={`/product/:${item._id}`}>
                      <span>{item.name}</span>
                    </Link>
                  </div>
                  <p>{item.about}</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <div className="sale">
                      {
                        item.salePrice?(
                          <>
                          <span className="line-through">₹{item.price}</span>
                          <span className="sale-amount">₹{item.salePrice}</span>
                          </>
                          ): (
                            <span className="sale-amount">₹{item.price}</span>
                          )
                      }
                    </div>
                    <Link to={`/product/:${item._id}`}>
                      <button className="btn btn-primary order-now">View Item</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    }else{
      return(<h3 className="text-center">No Data Found</h3>)
    }
  }


return (
<>
      <div className="sorting-section">
        <span>Sort By Price: </span>
        <select name="languages" id="lang" onChange={sort}>
          <option value="lth">Low To High</option>
          <option value="htl">High To Low</option>
        </select> 
      </div>
      <div className="products-wrap">
        <div className="row">
          
            {showProducts()}
        
        </div>
      </div>
</>
)
}