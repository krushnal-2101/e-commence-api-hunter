import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
   <>
 <div className="d-flex flex-column justify-content-center align-items-center vh-100">
  <Spinner animation="border" variant="info" />
  <p className="mt-2">Loading...</p>
</div>
   </>
  )
}

export default Loading