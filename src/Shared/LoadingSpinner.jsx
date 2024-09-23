import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
       <Spinner animation="border" />
    </div>
  )
}

export default LoadingSpinner
