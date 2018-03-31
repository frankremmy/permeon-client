import steem from '../lib/steemApi';
import config from "../config";

import {selectors} from "../reducers";
import { getAppJsonMetadata, generatePermlink } from "../helpers/postHelpers";

export const actionTypes = {
};

const { APP_NAME, POST_BENEFICIARY_FEE } = config.pick('APP_NAME', 'POST_BENEFICIARY_FEE');


// steem.broadcast.comment(wif, 'bigballer', permlink, 'bigballer', `re-${permlink}1`, '', '🍇', jsonPayload, function(err, result) {
//   console.log(err, result);
// });

export function postReaction(channel, videoPermlink, emoji) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const author = selectors.auth.activeAccountName(state);
    const jsonMetadata = JSON.stringify({
      emoji,
      app: getAppJsonMetadata(),
    });
    return steem.broadcast.commentAsync(
      postingKey,
      channel,
      videoPermlink,
      'bigballer', // author
      `${videoPermlink}-${generatePermlink()}`,
      '',   // title
      '🍇', // body (cant be blank so use native emoji)
      jsonMetadata,
    )
      .then(response => {
        console.log('response:', response);
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

