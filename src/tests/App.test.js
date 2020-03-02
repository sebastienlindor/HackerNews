import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Enzyme, {shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/App/App';

import Search from '../components/Search/';
import Button from '../components/Button';
import Table from '../components/Table';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(<App/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Search', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search onChange={() => "onChange clicked"}>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(<Search onChange={() => "onChange clicked"}>Search</Search>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Button', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button onClick={() => "button click"}>More</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(<Button onClick={() => "button click"}>More</Button>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows one button is created', () => {
        const element = shallow(<Button onClick={() => "button click"}>More</Button>);
        expect(element.props().children).toEqual('More');
    });
});

describe('Table', () => {
    const props = {
        list: [
            {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'}
        ]
    };

    it('renders without crashing', () => {
        const component = renderer.create(<Table onDismiss={() => "dismiss button click"} {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items are in the list', () => {
        const element = shallow(<Table onDismiss={() => "dismiss button click"} {...props} />);
        expect(element.find('.table-row').length).toBe(2);
    });
});