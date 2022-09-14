import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard";
import { ICategory, INewCategory } from "../../helper/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addAsyncCategory, categoryActions } from "../../store/categorySlice";
import styles from "./Categories.module.css";

const Categories = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showAddCategoryForm, setShowAddCategoryForm] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isFetching, errorMessage } = useAppSelector(
    (state) => state.category
  );

  const onFocusHandler = () => {
    dispatch(categoryActions.clearStatus());
  };

  useEffect(() => {
    if (isSuccess && inputValue.length > 0) {
      setInputValue("");
    }
  }, [isSuccess, inputValue]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleAddCategory = (event: FormEvent) => {
    event.preventDefault();
    const name: string = inputValue;
    if (name.length < 3) return;

    const newCategory: INewCategory = { name };

    dispatch(addAsyncCategory(newCategory));
  };

  return (
    <section className={styles.main_section}>
      <span className={styles.main_section_title}>Categories</span>
      <div className={styles.main_section_add_category}>
        <div className={styles.main_section_add_category_control}>
          <button
            className={styles.add_category_control_button}
            onClick={(event) => setShowAddCategoryForm(!showAddCategoryForm)}
          >
            {showAddCategoryForm ? "Close" : "Add Category"}
          </button>
        </div>
        {showAddCategoryForm && (
          <form
            className={styles.add_category_form}
            method="POST"
            onSubmit={handleAddCategory}
          >
            <div className={styles.add_category_form_div}>
              <label className={styles.add_category_form_label} htmlFor="name">
                Give the new category a name.
              </label>
              <input
                className={styles.add_category_form_input}
                name="name"
                onFocus={onFocusHandler}
                minLength={3}
                maxLength={40}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              {inputValue.length >= 0 && `${inputValue.length}/40`}
              {isError && <div>{errorMessage}</div>}
              {isFetching && <div>Trying to add category.</div>}
              {isSuccess && <div>Successfully added a category.</div>}
              <button type="submit">Add Category</button>
            </div>
          </form>
        )}
      </div>
      <ul className={styles.card_list}>
        {categories.map((item) => (
          <Link
            to={String(item.id)}
            className={styles.card_list_wrapper}
            key={item.id}
          >
            <CategoryCard category={item.name}></CategoryCard>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
