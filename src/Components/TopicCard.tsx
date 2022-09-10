import { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addAsyncPost, IPost } from "../store/postSlice";
import styles from "./TopicCard.module.css";

interface TopicCardProps {
  Title: string;
  topicId: number;
  Posts: PostInterface[];
}

interface PostInterface {
  id: number;
  message: string;
  appUserId: number;
  topicId: number;
  appUser: {
    id: number;
    username: string;
  };
}

const TopicCard = (props: TopicCardProps) => {
  const [limit, setLimit] = useState<boolean>(true);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { isError, isFetching, isSuccess } = useAppSelector(
    (state) => state.post
  );

  const postlimit: number = 3;

  const postComment = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const comment = commentRef.current!.value;
    if (comment?.length! <= 0 && comment) {
      return;
    }

    dispatch(
      addAsyncPost({
        topicId: props.topicId,
        message: comment!,
      } as IPost)
    );
  };

  useEffect(() => {
    if (isError) {
    }

    if (isFetching) {
    }

    if (isSuccess) {
      commentRef.current!.value = "";
    }
  }, [isError, isFetching, isSuccess]);

  return (
    <article className={styles.main}>
      <h1>{props.Title}</h1>
      <form className={styles.main_comment}>
        <label htmlFor="Post">Post a Comment</label>
        <textarea
          name="Post"
          ref={commentRef}
          placeholder="Enter your comment..."
        />
        <button className={styles.main_comment_button} onClick={postComment}>
          Post
        </button>
      </form>
      <div className={styles.main_posts}>
        {!limit &&
          props.Posts.map((post) => (
            <div className={styles.main_posts_post} key={post.id}>
              <p>{post.message}</p>
              <span>{post.appUser.username}</span>
            </div>
          ))}
        {limit &&
          props.Posts.slice(0, postlimit).map((post) => (
            <div className={styles.main_posts_post} key={post.id}>
              <p>{post.message}</p>
              <span>{post.appUser.username}</span>
            </div>
          ))}
      </div>
      <button className={styles.main_button} onClick={() => setLimit(!limit)}>
        Show more
      </button>
    </article>
  );
};

export default TopicCard;
