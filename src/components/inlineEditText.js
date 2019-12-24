import React, { useState, useEffect, useRef } from 'react'
import useKeypress from '../hooks/useKeyPress'
import useOnClickOutside from '../hooks/useClickOutside'
import DOMPurify from 'dompurify'

function InlineTextEdit(props) {
  const wrapperRef = useRef(null)
  const textRef = useRef(null)
  const inputRef = useRef(null)

  const [isInputActive, setIsInputActive] = useState(false)
  const [inputValue, setInputValue] = useState(props.text)
  const [inputHeight, setInputHeight] = useState(0)

  const enter = useKeypress('Enter')
  const esc = useKeypress('Escape')

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue)
      setIsInputActive(false)
    }
  })

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      setInputHeight(inputRef.current.scrollHeight)
      inputRef.current.focus()
    }
  }, [isInputActive])

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        props.onSetText(inputValue)
        setIsInputActive(false)
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text)
        setIsInputActive(false)
      }
    }
    // eslint-disable-next-line
  }, [enter, esc]) // watch the Enter and Escape key presses

  const autosize = () => {
    setTimeout(function() {
      setInputHeight(inputRef.current.scrollHeight)
    }, 0)
  }
  useEffect(() => {
    inputRef.current.addEventListener('keyup', autosize)
    return () => {
      inputRef.current.removeEventListener('keydown', autosize)
    }
  }, [])

  return (
    <span className='inline-text' ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${!isInputActive ? 'active' : 'hidden'}`}>
        {props.text}
      </span>
      <textarea
        ref={inputRef}
        rows='3'
        data-min-rows='3'
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ padding: 0, boxSizing: 'content-box', height: 'auto', height: inputHeight }}
        value={inputValue}
        onChange={e => {
          // sanitize the input a little
          setInputValue(DOMPurify.sanitize(e.target.value))
        }}
        className={`inline-text_input inline-text_input--${isInputActive ? 'active' : 'hidden'}`}
      />
    </span>
  )
}

export default InlineTextEdit
