import { Formik, Form, Field } from 'formik';
import {useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const SearchSchema = Yup.object().shape({
  tags: Yup.string().required('Tags are required'),
});

export default function SearchBar() {
  const [bookmarks, setBookmarks] = useState([]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('TAGS: ', values.tags)
    try {
      const response = await axios(`/api/getBookmarks?tags=${values.tags}`);
      const data = await response.data;
      setBookmarks(data);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ tags: '' }}
        validationSchema={SearchSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="tags" placeholder="Enter comma-separated tags" />
            <button type="submit" disabled={isSubmitting}>Search</button>
          </Form>
        )}
      </Formik>
      {bookmarks.length > 0 && (
        <div>
          <h2>Bookmarks</h2>
          <ul>
            {bookmarks.map(bookmark => (
              <li key={bookmark._id}>
                <a href={bookmark.url} target='_blank'>{`${bookmark.title}- ${bookmark.url}`}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};