import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header } from 'semantic-ui-react';

import Comment from './Comment';
import { countVotes } from '../../helpers/videoHelpers';
import { totalPostRewards } from '../../helpers/rewardsHelpers';

const Comments = ({ rootComments, comments }) => {
  return (
    <div>
      <SMComment.Group>
        <Header as="h3" dividing style={{ border: 'none' }}>
          {comments.length} Comments
        </Header>
        {rootComments.map(comment => {
          const { upvotes, downvotes } = countVotes(comment.active_votes);
          return (
            <Comment
              key={comment.author + comment.permlink}
              depth={1}
              author={comment.author}
              date={comment.created}
              rewards={totalPostRewards(comment)}
              body={comment.body}
              upvotes={upvotes}
              downvotes={downvotes}
              replies={comment.replies}
              comments={comments}
            />
          );
        })}
      </SMComment.Group>
    </div>
  );
};

Comments.propTypes = {};

export default Comments;
