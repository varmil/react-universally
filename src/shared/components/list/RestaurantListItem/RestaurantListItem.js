import React, { Component } from 'react';
import Ink from 'react-ink'

import { Paper, Divider, Avatar } from 'material-ui';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money'

import FiveStar from '../../FiveStar'
import ReviewCount from '../../ReviewCount'
import styles from './index.css'

class RestaurantListItem extends Component {


  render() {
    const { onTapItem, data } = this.props
    return (
      <Paper className={`${styles.paper}`} onTouchTap={onTapItem}>
        <Ink />
        <h3 className={styles.cardTitle}>{data.name}</h3>
        <h6>{`${data.area} / ${data.genre}`}</h6>

        <div className={styles.ratingLine}>
          <FiveStar rating={data.rating} />
          <ReviewCount count={data.review} />
        </div>

        <div className={styles.thumbnailContainer}>
          <img className={styles.thumbnail} src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/44818/150x150_square_44818441.jpg" alt={data.name} />
          <img className={styles.thumbnail} src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/46305/150x150_square_46305598.jpg" alt={data.name} />
        </div>

        <div className={styles.prText}>
          {data.prText}
        </div>

        <Divider />

        <div className={`${styles.infoBottom}`}>
          <div className={`${styles.infoBottomLine}`}>
            <Avatar size={20} icon={<EditorAttachMoney />} />
            <span className={`${styles.iconRightText}`}>￥{data.lowerLimitBudget} ~ ￥{data.upperLimitBudget}</span>
          </div>
          <div className={`${styles.infoBottomLine}`}>
            <Avatar size={20} icon={<MapsPinDrop />} />
            <span className={`${styles.iconRightText}`}>{data.area}から{data.distance}m</span>
          </div>
        </div>

      </Paper>
    );
  }
}

export default RestaurantListItem;
