import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchBar from './SearchBar';
import BookmarkForm from './BookmarkForm';

export default function InputContainer() {

  return (
    <Tabs>
      <TabList>
        <Tab>Search</Tab>
        <Tab>Add a Bookmark</Tab>
      </TabList>

      <TabPanel>
        <SearchBar />
      </TabPanel>
      <TabPanel>
        <BookmarkForm />
      </TabPanel>
    </Tabs>
  );
}