import React, {Component} from 'react';
import axios from 'axios';
import '../../css/App.css';
import Search from '../../components/Search/';
import Table from '../../components/Table/';
import Button from '../../components/Button/'

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from '../../constants/index';
import Loading from "../Loading";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this._setSearchKeyState = this._setSearchKeyState.bind(this);
        this._setErrorState = this._setErrorState.bind(this);
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    setSearchTopStories(result) {
        const {hits, page, nbHits} = result;
        const {searchKey, results} = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page, nbHits}
            },
            isLoading: false,
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true});
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
        axios(url)
            .then(result => this.setSearchTopStories(result.data))
            .catch(error => this._setErrorState(error));
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value.toLowerCase()});
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this._setSearchKeyState(searchTerm);
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }

    onDismiss(id) {
        const {results, searchKey} = this.state;
        const {hits, page} = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        });
    };

    componentDidMount() {
        const {searchTerm} = this.state;
        this._setSearchKeyState(searchTerm);
        this.fetchSearchTopStories(searchTerm);
    }

    _setSearchKeyState(searchKey) {
        this.setState({searchKey});
    }

    _setErrorState(error) {
        this.setState({error});
    }

    render() {

        const {
            searchTerm,
            results,
            searchKey,
            error,
            isLoading,
        } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                    {error
                        ? <div className="interactions">
                            <p>Something went wrong.</p>
                        </div>
                        : <Table
                            list={list}
                            onDismiss={this.onDismiss}
                        />
                    }
                </div>
                <div className="interactions">
                    {isLoading
                        ? <Loading/>
                        : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                            More
                        </Button>

                    }
                </div>
            </div>
        )
    }
}

export default App;
