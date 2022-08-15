import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: string;
}

const CategoryCard = (props: CategoryCardProps) => {
  return <li className={styles.card_item}>{props.category}</li>;
};

export default CategoryCard;
