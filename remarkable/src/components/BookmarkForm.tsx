import { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface BookmarkFormValues {
  url: string;
  title: string;
  tags: string[];
}

const initialValues = {
  url: '',
  title: '',
  tags: ['']
};

const validationSchema = Yup.object().shape({
  url: Yup.string()
    .url('Please enter a valid URL')
    .required('Url is required'),
  title: Yup.string()
    .required('Title is required'),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least one tag')
});

export default function BookmarkForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values: BookmarkFormValues, { setFieldError }: {setFieldError: (field: string, message: string) => void}) => {
    axios
      .post('/api/createBookmark', values)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        if(err.response.data.code === 11000) setFieldError('url', 'Bookmark already exists');
        else setErrorMessage('Bookmark could not be created at this time');
      });
  }

  return (
    <div>
      <h2>Add Bookmark</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ values, errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="url">URL</label>
              <Field type="text" name="url" id="url" />
              {errors.url && touched.url ? <div style={{color: 'red'}}>{errors.url}</div> : null}
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" id="title" />
              {errors.title && touched.title ? <div style={{color: 'red'}}>{errors.title}</div> : null}
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <FieldArray name="tags">
                {({ push, remove }) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index}>
                        <Field type="text" name={`tags[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>
                      Add Tag
                    </button>
                    {errors.tags && touched.tags ? (
                      <div>{errors.tags}</div>
                    ) : null}
                  </div>
                )}
              </FieldArray>
            </div>
            <button type="submit">Submit</button>
            <ErrorMessage name="submit" component="div" />
            {errorMessage && <div>{errorMessage}</div>}
          </Form>
        )}

      </Formik>
    </div>
  )
}