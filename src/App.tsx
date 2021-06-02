import React from 'react';
import Factions from './components/Factions/Factions';
import Search from './components/Search/Search';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
    return (
        <div className="App">
            <Tabs>
                <TabList>
                    <Tab>Factions</Tab>
                    <Tab>Search</Tab>
                </TabList>

                <TabPanel>
                    <Factions />
                </TabPanel>
                <TabPanel>
                    <Search />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default App;
