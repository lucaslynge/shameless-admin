import { useSelector } from "react-redux";
import { selectArticles } from "../features/articlesSlice";
import { useEffect } from "react";
import { useLazyGetPicksArticlesQuery } from "../services/articleApi";

export const usePickArticles = () => {
  const { picks } = useSelector(selectArticles);
  const [getPickedArticles, { data }] = useLazyGetPicksArticlesQuery();

  useEffect(() => {
    if (!picks.length) {
      getPickedArticles();
    }
  }, [picks]);

  return picks;
};
