import React from 'react';
import { mount } from 'enzyme';
import store from '../store/store';
import { Provider } from 'react-redux';
import App from '../App';

test('have two tabs', () => {
    function Wrapper() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

    const wrapper = mount(<Wrapper />);

    const children = wrapper.find('li.react-tabs__tab');

    expect(children).toHaveLength(2);
});

test('tabs text', () => {
    function Wrapper() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

    const wrapper = mount(<Wrapper />);

    const children = wrapper.find('li.react-tabs__tab');

    expect(children.at(0).text()).toEqual('Factions');
    expect(children.at(1).text()).toEqual('Search');
});
