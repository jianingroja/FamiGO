import { useState } from 'react';

import Comment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';
import './CommentSection.css';

type Props = {
  myUsername: string;
  activityId: string;
};

const CommentSection = ({ myUsername, activityId }: Props) => {
  const [showComment, setShowComment] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);

  return (
    <div className="comment-section">
      <div className="add-comment">
        <button
          className={`button ${showComment ? 'btn-grey' : ''}`}
          onClick={() => setShowComment((prev) => !prev)}
        >
          {showComment ? 'Hide' : 'Add a comment'}
        </button>

        {showComment && (
          <Comment
            myUsername={myUsername!}
            activityID={activityId}
            onCommentSubmitted={() => {
              setShowComment(false);
              setRefreshComments((prev) => prev + 1);
            }}
          />
        )}
      </div>

      <div className="toggle-comment">
        <button
          className={`button ${showAllComments ? 'btn-grey' : ''}`}
          onClick={() => setShowAllComments((prev) => !prev)}
        >
          {showAllComments ? 'Hide all comments' : 'Show all comments'}
        </button>
      </div>
      {showAllComments && (
        <CommentList activityID={activityId} refresh={refreshComments} />
      )}
    </div>
  );
};

export default CommentSection;
