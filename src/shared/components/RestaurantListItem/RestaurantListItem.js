import React, { Component } from 'react';
import StarRating from 'react-rating';

import { Paper, Divider, Table, TableBody, TableRow, TableRowColumn } from 'material-ui';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money'
import Star from 'material-ui/svg-icons/toggle/star';
import CommTextsms from 'material-ui/svg-icons/communication/textsms';
import { grey300, yellow700 } from 'material-ui/styles/colors';

import styles from './index.css'

class RestaurantListItem extends Component {


  render() {
    const { onTapItem, data } = this.props
    return (
      <Paper className={`${styles.paper}`} onTouchTap={onTapItem}>
        <h3 className={styles.cardTitle}>{data.name}</h3>
        <h6>{`${data.area} / ${data.genre}`}</h6>

        <div className={styles.ratingLine}>
          <StarRating empty={<Star color={grey300} />} full={<Star color={yellow700} />} readonly={true} initialRate={data.rating} />
          <span className={`${styles.adjustRatingLine} ${styles.ratingLabel}`}>{data.rating.toFixed(2)}</span>
          <span className={`${styles.adjustRatingLine} ${styles.reviewCount}`}>
            {<CommTextsms color={grey300} style={{ width: '20px', height: '20px' }} />}{data.review}
          </span>
        </div>

        <div className={styles.thumbnailContainer}>
          <img className={styles.thumbnail} src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/44818/150x150_square_44818441.jpg" alt={data.name} />
          <img className={styles.thumbnail} src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/46305/150x150_square_46305598.jpg" alt={data.name} />
        </div>

        <div className={styles.prText}>
          {data.prText}
        </div>

        <Divider />

        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn>
                <EditorAttachMoney />
                <span>{data.lowerLimitBudget} ~ {data.upperLimitBudget}</span>
              </TableRowColumn>
              <TableRowColumn>
                <MapsPinDrop />
                <span>{data.area}から{data.distance}m</span>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

      </Paper>
    );
  }
}

export default RestaurantListItem;
