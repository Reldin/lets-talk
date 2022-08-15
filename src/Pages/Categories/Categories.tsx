import { Link } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard";
import styles from "./Categories.module.css";

const Categories = () => {
  const list = [
    "Sports",
    "Music",
    "Games",
    "Cars",
    "Gym",
    "Hiking",
    "Books",
    "Movies",
  ];

  return (
    <section>
      <ul className={styles.card_list}>
        {list.map((item) => (
          <Link
            to={item}
            className={styles.card_list_wrapper}
            key={Math.random()}
          >
            <CategoryCard category={item}></CategoryCard>{" "}
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
