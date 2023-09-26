import React from 'react'

export default function BestsellerProducts() {
  return (
    <>
      <div className="home-products-archive">
      <div className="container">
        <div className="sec-heading m-auto mb-5 text-center col-md-7">
          <h2>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do</h2>
        </div>
      </div>
      <div className="products-wrap">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-md-4 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <img src="./assets/images/products-image_03.png" alt="product-image"/>
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      <img src="./assets/images/veg.png" alt="veg icon"/>
                    </div>
                    <span>Veg-Loaded Pizza</span>
                  </div>
                  <p>Pancake with fully added cheese and coverd with pizza</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <span>₹499</span>
                    <button className="btn btn-primary order-now">Order Now</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <img src="./assets/images/products-image_03.png" alt="product-image"/>
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      <img src="./assets/images/veg.png" alt="veg icon"/>
                    </div>
                    <span>Veg-Loaded Pizza</span>
                  </div>
                  <p>Pancake with fully added cheese and coverd with pizza</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <span>₹499</span>
                    <button className="btn btn-primary order-now">Order Now</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <img src="./assets/images/products-image_03.png" alt="product-image"/>
                  <span className="bestseller">Bestseller</span>
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      <img src="./assets/images/veg.png" alt="veg icon"/>
                      <img src="./assets/images/non-veg.png" alt="veg icon"/>
                    </div>
                    <span>Veg-Loaded Pizza</span>
                  </div>
                  <p>Pancake with fully added cheese and coverd with pizza</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <span>₹499</span>
                    <button className="btn btn-primary order-now">Order Now</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <img src="./assets/images/products-image_03.png" alt="product-image"/>
                  <span className="sale-icon">15% OFF</span>
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      <img src="./assets/images/veg.png" alt="veg icon"/>
                    </div>
                    <span>Veg-Loaded Pizza</span>
                  </div>
                  <p>Pancake with fully added cheese and coverd with pizza</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <div className="sale">
                      <span className="line-through">₹699</span>
                      <span className="sale-amount">₹499</span>
                    </div>
                    {/* <!-- <span>₹499</span> --> */}
                    <button className="btn btn-primary order-now">Order Now</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div className="spacer"></div>
    </>
  )
}
