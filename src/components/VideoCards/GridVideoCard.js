import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Header } from 'semantic-ui-react';
import classNames from 'classnames';

import styles from './GridVideoCard.css';
import TimeAgo from "../TimeAgo/TimeAgo";

const GridVideoCard = ({
  url,
  title,
  username,
  thumbnail,
  playtime,
  rewards,
  date,
  app,
}) => {
  return (
    <div className={styles.GridVideoCard}>
      <Link to={url}>
        <Image src={thumbnail} />
        <span className={styles.Playtime}>{playtime}</span>
        <Header as='h4'>{title}</Header>
      </Link>
      <Link to={`/channel/${username}`} className={classNames(styles.AuthorLink, 'red')}>{username}</Link>
      <div>
        <span className={styles.Rewards}>{rewards}</span>
        <span className={styles.Date}><TimeAgo date={date}/></span>
      </div>
    </div>
  );
};

GridVideoCard.propTypes = {

};

export default GridVideoCard;
