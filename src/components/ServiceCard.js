import React from 'react'

const ServiceCard = ({service: {name, description}}) => {
    return (
        <div className="grid-el">
            <div>
                <img src="https://picsum.photos/seed/sdfsdf/200" />
            </div>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard