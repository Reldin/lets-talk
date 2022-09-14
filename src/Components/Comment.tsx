import { useState } from "react";
import { PostInterface } from "../helper/interfaces";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteAsyncPost } from "../store/postSlice";

import styles from "./Comment.module.css";

interface ICommentProps {
  post: PostInterface;
}

const Comment = ({ post }: ICommentProps) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.post);
  const { isAuthenticated, username } = useAppSelector((state) => state.auth);

  const deleteComment = (id: number) => {
    console.log(id);
    dispatch(deleteAsyncPost(id))
      .unwrap()
      .then(() => setHasError(false))
      .catch(() => setHasError(true));
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_div}>
        <span>{post.appUser.username}</span>
        {post.appUser.username === username && (
          <button
            className={styles.post_div_button}
            onClick={() => deleteComment(post.id)}
          >
            x
          </button>
        )}
      </div>
      <p>{post.message}</p>
      {hasError && <span className={styles.error_message}>{errorMessage}</span>}
    </div>
  );
};

export default Comment;
