import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicCard from "../../../Components/TopicCard";
import { INewTopic } from "../../../helper/interfaces";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addAsyncTopic, topicActions } from "../../../store/topicSlice";
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

interface TopicInterface {
  id: number;
  title: string;
  posts: PostInterface[];
  category: {
    id: number;
    name: string;
  };
}

const Category = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [topics, setTopics] = useState<TopicInterface[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const parameter = useParams();
  const { isSuccess } = useAppSelector((state) => state.post);
  const topicState = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/categories/${parameter.id}`)
      .then((response) => {
        setTopics(response.data);
      });
    axios
      .get(`http://localhost:3001/posts/categories/category/${parameter.id}`)
      .then((response) => {
        setCategoryName(response.data);
      });
  }, [parameter.id, isSuccess]);

  const handleAddTopic = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const categoryId: string | undefined = parameter.id;

    if (!categoryId) return;
    const data: INewTopic = { categoryId: categoryId, title: inputValue };
    dispatch(addAsyncTopic(data));

    setInputValue("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <h1>{categoryName}</h1>
        <p>
          This is the description area. It is currently static for every
          category. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Laboriosam quos assumenda eius, ut ipsum a, distinctio asperiores
          repellat minima eos mollitia? Magnam aliquid amet veniam delectus
          atque vitae possimus deleniti.
        </p>
        {topics.length === 0 && (
          <div className={styles.main_isempty}>
            No topics found. Create a new topic?
          </div>
        )}
        <form className={styles.main_form} onSubmit={handleAddTopic}>
          <div className={styles.main_form_div}>
            <label>Add Topic</label>
            <div className={styles.main_form_div_inputdiv}>
              <input
                placeholder="Enter a new topic"
                maxLength={40}
                value={inputValue || ""}
                onChange={(event) => setInputValue(event.target.value)}
                onFocus={() => dispatch(topicActions.clearState())}
              />
              <div>
                {inputValue.length <= 9
                  ? "0" + inputValue.length
                  : inputValue.length}
                /40
              </div>
            </div>
            {topicState.isSuccess && (
              <div className={styles.main_form_success}>
                Successfully added a topic
              </div>
            )}
            {topicState.isError && (
              <div className={styles.main_form_error}>
                {topicState.errorMessage.split(",").map((str: string) => (
                  <span key={str}>{str}</span>
                ))}
              </div>
            )}
            <button>Submit</button>
          </div>
        </form>
        {topics
          .slice()
          .reverse()
          .map((item) => (
            <TopicCard
              key={item.id}
              topicId={item.id}
              Title={item.title}
              Posts={item.posts}
            />
          ))}
      </div>
    </section>
  );
};

export default Category;
