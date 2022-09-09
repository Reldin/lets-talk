import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicCard from "../../../Components/TopicCard";
import styles from "./Category.module.css";

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

const Category = () => {
  const [name, setName] = useState<string>("");
  const [topics, setTopics] = useState<
    { id: number; title: string; posts: PostInterface[] }[]
  >([]);
  const parameter = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/categories/${parameter.id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setName(response.data[0].name);
          setTopics(response.data);
        } else {
          axios
            .get(
              `http://localhost:3001/posts/categories/category/${parameter.id}`
            )
            .then((response) => {
              console.log(response.data);
              setName(response.data);
            });
        }
      });
  }, [parameter.id]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        {name && <h1>{name}</h1>}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          corrupti suscipit neque sint quasi, soluta debitis laborum eum
          deserunt quo quod natus, temporibus perferendis harum itaque, pariatur
          dolore dicta quisquam?
        </p>
        {topics.map((item) => (
          <TopicCard
            key={item.id}
            topicId={item.id}
            Title={item.title}
            Posts={item.posts}
          />
        ))}

        {topics.length === 0 && <div>No topics found. Create a new topic?</div>}
      </div>
    </section>
  );
};

export default Category;
