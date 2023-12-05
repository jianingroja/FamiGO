import { useEffect, useState } from 'react';
import { getComments } from '../../services/activity';
import './CommentList.css';

interface Comment {
  _id: string;
  username: string;
  text: string;
}

interface Props {
  activityID: string;
  refresh: number;
}

const CommentList = ({ activityID, refresh }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(activityID);
        setComments(res);
      } catch (error) {
        console.error('Error al obtener comentarios', error);
      }
    };

    fetchComments();
  }, [activityID, refresh]);

  if (!comments.length) {
    return <p>no comment yet</p>;
  }

  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            {comment.username}: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
