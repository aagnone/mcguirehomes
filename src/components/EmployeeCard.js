import React from 'react'

const EmployeeCard = ({employee: {name, bio}}) => {
    return (
        <div style={{width: '200px', margin: '0 20px'}}>
            <div>
                <img src="https://picsum.photos/200" />
            </div>
            <div>
                <h1>{name}</h1>
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default EmployeeCard