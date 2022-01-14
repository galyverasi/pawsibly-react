import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CreateBooking from './CreateBooking'


export default function ListingDetail(props) {
    console.log('sitter listing detail props', props.allSitters)
    
    const [singleSitter, setSingleSitter] = useState([])

    let newParam = useParams()

    useEffect(() =>{
        console.log('getting single sitter')
        getSingleSitter()
    }, [])

    const getSingleSitter = () => {
        axios({
			url: `http://localhost:8000/sitters/${newParam.id}`,
			method: 'GET',
		})
        .then(foundSingleSitter =>{
            console.log('this is single sitter', foundSingleSitter.data.sitter.id)
            setSingleSitter(foundSingleSitter.data.sitter)
        })
    }

   
    
    return (
        <div>
            <li>
            <h2>{singleSitter.first_name}</h2>
            <h2>{singleSitter.last_name}</h2>
            <p>{singleSitter.numReviews}</p>
            <p>{singleSitter.rating}</p>
            <p>{singleSitter.pricing}</p>
            </li>
            <div>
            <CreateBooking singleSitter={singleSitter} user={props.user}/>

            </div>
        </div>
    )
}