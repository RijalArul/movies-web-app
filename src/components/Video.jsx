import React, { useRef, useEffect } from 'react'
function Video (props) {
  const item = props.item

  const iframeRef = useRef(null)

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  }, [])

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width='68%'
        style={{ marginLeft: '125px', height: '270px', marginTop: '15px' }}
        title='video'
      ></iframe>
    </div>
  )
}

export default Video
