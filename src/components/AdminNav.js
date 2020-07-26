import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faComments, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/Auth'
import App from '../firebaseauth.config'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="d-flex fixed-top" style={{ right: '10px', left: 'auto', top: '10px' }}>
      {user ? (
        <a href="#" onClick={() => App.auth().signOut()}>
          <FontAwesomeIcon className="ml-3 text-main" icon={faUnlock} />
        </a>
      ) : (
        <Link to="/adminSignIn"><FontAwesomeIcon className="ml-3 text-main" icon={faLock} /></Link>
      )}
      {user && <Link to="/messages"><FontAwesomeIcon className="ml-3 text-main" icon={faComments} /></Link>}
    </div>
  )
}

export default AdminNav
