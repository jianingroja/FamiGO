import React, { useEffect, useState } from 'react';
import { getComments } from '../../services/activity';
import './CommentList.css';

interface Comment {
  _id: string;
  username: string;
  text: string;
}

interface CommentListProps {
  activityID: string;
  refresh: number;
}

const CommentList: React.FC<CommentListProps> = ({ activityID, refresh }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(activityID);
        setComments(response.comments);
      } catch (error) {
        console.error('Error al obtener comentarios', error);
      }
    };

    fetchComments();
  }, [activityID, refresh]);

  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {comments ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>
              {comment.username}: {comment.text}
            </p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
