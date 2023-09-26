import React, { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
export default function Dashboard() {
    const getData = ()=>{
        axios({
            url: "http://localhost:3001/user/dashboard/",
            method: "post",
            data: {
                token: Cookies.get("userToken")
            }
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
      Dasjnoard
    </div>
  )
}
