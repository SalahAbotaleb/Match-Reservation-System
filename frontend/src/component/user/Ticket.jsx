import React from 'react'
import "./StadiumsPage.css";
import { useState } from "react";

const Ticket = ({ ticket }) => {
    return (
        <div className="Ticket">
            <div className="row">
                <div className="col-md-6">
                    <h3> Teams </h3>
                </div>
            </div>
            <div className="row">
                <p className='details'>Price: {ticket.Price}                                  Stadium: {ticket.locations} </p>
            </div>
            <div className="row">
                <p></p>
            </div>
        </div>
    )
}

export default Ticket