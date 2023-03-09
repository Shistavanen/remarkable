import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

const handleSubmit = async (values: Object) => {
  axios
    .post('/api/createBookmark', values)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

export default function BookmarkForm() {

  return (
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
            {errors.url && touched.url ? <div>{errors.url}</div> : null}
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" id="title" />
            {errors.title && touched.title ? <div>{errors.title}</div> : null}
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
        </Form>
      )}

    </Formik>
  )
}