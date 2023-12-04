import { ChangeEvent, useState } from 'react';
import { publishComment } from '../../services/activity';
import './Comment.css';
interface CommentProps {
  myUsername: string;
  activityID: string;
  onCommentSubmitted: () => void;
}

const Comment: React.FC<CommentProps> = ({
  myUsername,
  activityID,
  onCommentSubmitted,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setCommentText(newText);
  };

  const submitComment = async () => {
    await publishComment(myUsername!, activityID!, commentText);
    setIsCommentSubmitted(true);
    onCommentSubmitted();
  };

  return (
    <>
      {!isCommentSubmitted && (
        <div className="comment-section">
          <textarea
            name="textarea"
            rows={6}
            cols={45}
            value={commentText}
            onChange={handleTextareaChange}
            placeholder="Write your comment here..."
          />
          <button className="button" onClick={() => submitComment()}>
            Send
          </button>
        </div>
      )}
      <br />
    </>
  );
};

export default Comment;
