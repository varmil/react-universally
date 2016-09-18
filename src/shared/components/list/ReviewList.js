import React from 'react'
import { Link } from 'react-router'
import ReviewListItem from './ReviewListItem'

export default (props) => {
  return(
    <div>
      {props.reviews.map((review, index) => (
        <Link
          key={`link${index}`}
          to={`/restaurant/detail/${props.restaurantId}/review/${review.id}`}
          style={{ textDecoration: 'none' }}
        >
          <ReviewListItem key={`review${index}`} {...review} />
        </Link>
      ))}
    </div>
  )
}
