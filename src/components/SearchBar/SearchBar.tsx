import { Field, Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { SearchBarProps, SearchFormValues } from "./SearchBar.types";

import s from "./SearchBar.module.css";

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter your query");
      return;
    }

    onSubmit(trimmedQuery);
    actions.resetForm();
  };

  return (
    <header className={s.header}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field
            className={s.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
