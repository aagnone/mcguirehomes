import React, {useState} from 'react'
import joey from '../images/joey.jpg'
import jenny from '../images/jenny.jpg'
import melissa from '../images/melissa.jpg'
import tommy from '../images/tommy.jpg'
import hannah from '../images/hannah.jpg'
import kelly from '../images/kelly.jpg'

const EmployeeCard = ({employee: {name, bio, id, title}}) => {
    const [images, setImage] = useState([joey, jenny, melissa, tommy, hannah, kelly])
    
    const createBio = () => ({__html: bio})
    return (
        <div className="grid-el">
            <div>
                <img style={{width: '100%', height: 'auto'}} src={images[id]} />
            </div>
            <div>
                <h1>{name}</h1>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={createBio()} />
            </div>
        </div>
    )
}

export default EmployeeCard