import {useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchBar from './SearchBar';
import BookmarkForm from './BookmarkForm';
import 'react-tabs/style/react-tabs.css'; //Default styling for react-tabs

export default function InputContainer() {
  const [isSearchBar, setIsSearchBar] = useState(true);

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