import styles from "./TopicCard.module.css";

interface TopicCardProps {
  Title: string;
  Posts: string[];
}

const TopicCard = (props: TopicCardProps) => {
  return (
    <article className={styles.main}>
      <h1>{props.Title}</h1>
      <form className={styles.main_comment}>
        <label htmlFor="Post">Post a Comment</label>
        <textarea name="Post" placeholder="Enter your comment..." />
        <button className={styles.main_comment_button}>Post</button>
      </form>
      <div className={styles.main_posts}>
        {props.Posts.map((post) => (
          <div className={styles.main_posts_post} key={Math.random()}>
            <p>{post}</p>
            <span>Username</span>
          </div>
        ))}
      </div>
      <button className={styles.main_button}>Show more</button>
    </article>
  );
};

export default TopicCard;
