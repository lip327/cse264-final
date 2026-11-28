'use client'

import {useEffect, useState} from 'react'
import './homepage.css'
import '../spinner/spinner.css'

const API = "http://localhost:3001"

export default function Homepage(){

    const [lostItems, setLostItems] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        async function getItems(){
            try{
                const res = await fetch(`${API}/items`)
                const data = await res.json()
                console.log('data = ',data)
                setLostItems(data)
            }catch(error){
                alert("Failed to retrieve items")
            }
            return
        }
        getItems()
    },[])

    return(
        <div>
            <h1>Lost and found items</h1>
            <div className = 'loader' style={{display:loading?'flex':'none'}}></div>
            {lostItems?.map((item)=>(
                <div key={item.item_id}>
                    <label>{item.title}</label>
                    <p>Posted by {item.username} at {item.created}</p>
                </div>
            ))}
        </div>
    )
}