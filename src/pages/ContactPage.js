import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import { db } from '../firebaseauth.config'

const ContactPage = () => {
  const initialItemValues = {
    name: '',
    email: '',
    message: '',
  }

  const initialValidation = {
    answer: '',
  }
  const [item, setItem] = useState(initialItemValues)
  const [validation, setValidation] = useState(initialValidation)
  const [isValid, setIsValid] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  const onSubmit = (event) => {
    if (isValid) {
      event.preventDefault()
      if (item.name.length && item.message.length) {
        db.collection('messages')
          .doc()
          .set(item)
          .then(() => {
            setItem(initialItemValues)
            setMessageSent(true)
          })
          .catch((error) => console.error(error))
      }
    }
  }
  const validOnSubmit = (e) => {
    e.preventDefault()
    setIsValid(validation.answer === 'four' || validation.answer === '4')
  }

  const onChange = ({ target }) => {
    setItem({
      ...item,
      [target.name]: target.value,
    })
  }

  const onValidationChange = ({ target }) => {
    setValidation({
      ...validation,
      [target.name]: target.value,
    })
  }

  return (
    <div className="home-container">
      <header>
        <h1 className="header-text">Say Hello! Tell us what we can do for you.</h1>
      </header>
      <main className="d-block" style={{minHeight: '100vh'}}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <Fade left big>
            <h2 style={{ fontSize: '3.3rem', textAlign: 'center' }}>Contact Us</h2>
          </Fade>
          <div style={{position: 'relative'}}>
            <Fade right>
              {messageSent ? <p className="text-main">Message Sent!</p> : ''}
              {messageSent ? (
                ''
              ) : (
                <>
                  <div className="human-check">
                    <form onSubmit={(e) => validOnSubmit(e)}>
                      <div style={{paddingTop: '20px'}}>
                        <input
                          type="text"
                          class="validate[required,length[0,100]] feedback-input"
                          name="answer"
                          placeholder="A horse has ..... legs"
                          value={validation.answer}
                          onChange={onValidationChange}
                          id="answer"
                        />
                      </div>
                      <div class="submit">
                          <input type="submit" value="Are you human?" className="button-blue" />
                          <div class="ease"></div>
                        </div>
                    </form>
                  </div>

                  <div id="form-div">
                    <form class="form" id="form1" onSubmit={onSubmit}>
                      <p class="name">
                        <input
                          name="name"
                          type="text"
                          class="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                          placeholder="Name"
                          id="name"
                          value={item.name}
                          onChange={onChange}
                        />
                      </p>

                      <p class="email">
                        <input
                          name="email"
                          type="text"
                          class="validate[required,custom[email]] feedback-input"
                          id="email"
                          placeholder="Email"
                          value={item.email}
                          onChange={onChange}
                        />
                      </p>

                      <p class="text">
                        <textarea
                          name="message"
                          class="validate[required,length[6,300]] feedback-input"
                          id="comment"
                          placeholder="Message"
                          value={item.message}
                          onChange={onChange}
                        ></textarea>
                      </p>

                      {isValid && (
                        <div class="submit">
                          <input type="submit" value="SEND" className="button-blue" />
                          <div class="ease"></div>
                        </div>
                      )}
                    </form>
                  </div>
                </>
              )}
            </Fade>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPage
