import React, {Component} from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
    {
        title: 'GraphQl',
        url: 'https://graphql.org',
        author: 'Facebook',
        num_comments: 2,
        points: 1,
        objectID: 3,
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: '',
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const updatedList = this._removeButtonById(id);
        this.setState({list: updatedList});
    }

    _removeButtonById(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        return updatedList;
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value.toLowerCase() });
    }

    render() {
        const { searchTerm, list } = this.state;
        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                />
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        )
    }
}



export default App;
