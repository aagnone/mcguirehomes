import React from 'react'

const ServiceCard = ({service: {name, description}}) => {
    return (
        <div style={{width: '200px', margin: '0 20px'}}>
            <div>
                <img src="https://picsum.photos/200" />
            </div>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard