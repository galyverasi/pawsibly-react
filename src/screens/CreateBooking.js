import { useState, useEffect } from "react";
import axios from "axios";
import ListingDetail from "./ListingDetail";
import { useParams } from "react-router-dom";
// import DatePicker from "../components/DatePicker";
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle'
import { Button } from "react-materialize";

export default function CreateBooking (props) {
    console.log('this is props for sitter booking', props)

    const[newBooking, setBooking] =useState([])
    // const [user, setUser] = useState(props.user.id)
    // const [sitterName, setSitterName] = useState(props.singleSitter.id)
    const [date, setDate] = useState([])
    const now = new Date();
    const {id} = useParams()

    const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)

    const [value, onChange] = useState([yesterdayBegin, todayEnd]);

    const createBooking = (e) => {
        e.preventDefault()
    const booking = { pet_owner:props.user.id, start_date:date[0],end_date:date[1], sitter:props.singleSitter.id}

    console.log('booking date', date)
   
    fetch(`http://localhost:8000/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${props.user.token}`},
      body: JSON.stringify(booking)
    }).then(createdBooking => {
      console.log('new booking added', createdBooking)
      setBooking(createdBooking)
     

    }).catch(error =>{
      console.log(error);
    })
  
  }

    const handleDate = (data) => {
        console.log('date data', data)
        setDate(data)
    }


    return (
        <div class="card small">
            <div class="row center">
                <div class="col s12 m6">
                    {/* <div class="card"> */}
                        <div class="card-content black-text">
                            <span class="card-title">create a booking</span>
                            <span class="card-title">select dates</span>
                            <DateRangePicker
                                name='date'
                                id='date'
                                onChange={handleDate}
                                value={value}                        />
                            {/* <Button onClick={createBooking}>schedule</Button> */}
                            {/* </form> */}
                            <a class="btn-floating btn-large waves-effect waves-light yellow" onClick={createBooking}><i class="material-icons">add</i></a>
                        </div>
                </div>
            </div>
        </div>
    )
}