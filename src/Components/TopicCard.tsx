import { FormEvent, useEffect, useRef, useState } from "react";
import { PostInterface } from "../helper/interfaces";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addAsyncPost, IPost, postActions } from "../store/postSlice";
import Comment from "./Comment";
import styles from "./TopicCard.module.css";

interface TopicCardProps {
  Title: string;
  topicId: number;
  Posts: PostInterface[];
}

const TopicCard = (props: TopicCardProps) => {
  const [limit, setLimit] = useState<boolean>(true);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { isError, isFetching, isSuccess } = useAppSelector(
    (state) => state.post
  );

  const postlimit: number = 3;

  useEffect(() => {
    dispatch(postActions.clearState());
  }, [isSuccess, dispatch]);

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
          props.Posts.map((post) => <Comment key={post.id} post={post} />)}
        {limit &&
          props.Posts.slice(0, postlimit).map((post) => (
            <Comment key={post.id} post={post} />
          ))}
      </div>
      <button className={styles.main_button} onClick={() => setLimit(!limit)}>
        {limit ? "Show more" : "Show less"}
      </button>
    </article>
  );
};

export default TopicCard;
