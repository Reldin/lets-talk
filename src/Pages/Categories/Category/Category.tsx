import { useParams } from "react-router-dom";
import TopicCard from "../../../Components/TopicCard";
import styles from "./Category.module.css";

const Category = () => {
  const parameter = useParams();
  console.log(parameter.id);

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <h1>{parameter.id}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          corrupti suscipit neque sint quasi, soluta debitis laborum eum
          deserunt quo quod natus, temporibus perferendis harum itaque, pariatur
          dolore dicta quisquam?
        </p>
        <TopicCard
          Title="test"
          Posts={[
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
            "Voluptatem corrupti suscipit neque sint quasi",
            "soluta debitis laborum eum deserunt quo quod natus. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          ]}
        />
        <TopicCard Title="test" Posts={["Post1", "Post2", "Post3"]} />
      </div>
    </section>
  );
};

export default Category;
