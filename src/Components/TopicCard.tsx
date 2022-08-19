import styles from "./TopicCard.module.css";

interface TopicCardProps {
  Title: string;
  Posts: string[];
}

const TopicCard = (props: TopicCardProps) => {
  return (
    <article className={styles.main}>
      <h1>{props.Title}</h1>
      <div className={styles.main_post}>
        {props.Posts.map((post) => (
          <p key={Math.random()}>{post}</p>
        ))}
      </div>
    </article>
  );
};

export default TopicCard;
