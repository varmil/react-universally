import React from 'react'
import Slick from 'react-slick'
import './ImageSlick.css'

const DEFAULT_HEIGHT = 180

const settings = {
  dots: true,
  arrows: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  swipeToSlide: true,
  // infinite: false,
  // centerMode: false,
  // lazyLoad: true,
  // variableWidth: true,
  // autoplay: true,
}

const containerStyle = {
  margin: '0 auto',
  padding: '0 10px 20px',
  width: '100%',
}

const imgWrapperStyle = {
  overflow: 'hidden',
  padding: '0 2px'
}

// prevent display collapse (iPhone 5's 320px width is the limit)
const imgStyle = {
  margin: '0 auto',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
}

export default (props) => {
  const { srcs, height } = props
  const imgHeight = height || DEFAULT_HEIGHT

  if (! srcs || ! srcs.length) return null

  return(
    <div style={containerStyle}>
      <Slick {...settings}>
        {props.srcs.map((src, i) => (
          <div style={imgWrapperStyle} key={`ImageSlick-div${src}`}>
            <img key={`ImageSlick-img${src}`} src={src} role="presentation" style={imgStyle} height={imgHeight} />
          </div>
        ))}
      </Slick>
    </div>
  )
}
