import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard";
import styles from "./Categories.module.css";

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts`).then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  return (
    <section>
      <ul className={styles.card_list}>
        {categories.map((item) => (
          <Link
            to={item}
            className={styles.card_list_wrapper}
            key={Math.random()}
          >
            <CategoryCard category={item}></CategoryCard>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
