import React, { useState, useEffect, FormEvent } from 'react';
import { SearchCategories } from '../../common/constants';
import classes from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../store/app/slices';
import { fetchSearch } from '../../store/app/actions';
import Pagination from '../Pagination/Pagination';
import { sortByName } from '../../common/utils';

export default function Search() {
    const dispatch = useDispatch();
    const search = useSelector(getSearch);
    const sortedSearch = sortByName(search);

    const [inputValue, setinputValue] = useState('');
    const [dropdownValue, setdropdownValue] = useState('');
    const [message, setMessage] = useState('');
    const [isInputOk, setIsInputOk] = useState(true);
    const [isDropdownOk, setIsDropdownOk] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const elementsPerPage = 25;
    const offset = currentPage * elementsPerPage;
    const [pageCount, setPageCount] = useState(0);

    const INPUT_MIN_CHARS = 3;

    const currentPageData = sortedSearch && sortedSearch.slice(offset, offset + elementsPerPage);

    useEffect(() => {
        setPageCount(Math.ceil(search.length / elementsPerPage));
    }, [search]);

    useEffect(() => {
        if (search.length === 0 && inputValue && dropdownValue) {
            setMessage('No results were found for your search.');
        } else if (search.length !== 0) {
            setMessage(`Found: ${search.length}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function submitFormHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!inputValue || !dropdownValue) {
            if (!inputValue) {
                setIsInputOk(false);
                setMessage('Please fill in all required fields');
            }
            if (!dropdownValue) {
                setIsDropdownOk(false);
                setMessage('Please fill in all required fields');
            }
            return;
        } else if (inputValue.length < INPUT_MIN_CHARS) {
            setIsInputOk(false);
            setMessage(`Search term minimum characters: ${INPUT_MIN_CHARS}`);
            return;
        }

        setMessage('');
        setIsInputOk(true);
        setCurrentPage(0);

        dispatch(fetchSearch(dropdownValue, inputValue));
    }

    function inputChangeHandler(event: FormEvent<HTMLInputElement>) {
        setinputValue(event.currentTarget.value);
    }

    function dropdownChangeHandler(event: FormEvent<HTMLSelectElement>) {
        setdropdownValue(event.currentTarget.value);
        setIsDropdownOk(true);
    }

    function pageClickHandler(data: { selected: React.SetStateAction<number> }) {
        setCurrentPage(data.selected);
    }

    return (
        <div className={classes.Search}>
            <form onSubmit={submitFormHandler}>
                <label htmlFor="categories">Choose categories: </label>
                <select
                    className={isDropdownOk ? '' : classes.Error}
                    onChange={dropdownChangeHandler}
                    value={dropdownValue}
                    id="categories"
                    name="categories"
                >
                    <option disabled value="">
                        -- select an option --
                    </option>
                    {Object.entries(SearchCategories).map((category) => {
                        return (
                            <option key={category[0]} value={category[0]}>
                                {category[1]}
                            </option>
                        );
                    })}
                </select>
                <input
                    className={isInputOk ? '' : classes.Error}
                    onChange={inputChangeHandler}
                    value={inputValue}
                    type="text"
                />
                <button>Search</button>
            </form>
            {message && <div className={classes.SearchMessage}>{message}</div>}
            <div className={classes.SearchResult}>
                Search result:
                <table>
                    <thead>
                        <th>Name</th>
                        <th>ID</th>
                    </thead>
                    <tbody>
                        {currentPageData &&
                            currentPageData.map((el) => {
                                return (
                                    <tr key={el.id} className={classes.Table}>
                                        <td>{el.name}</td>
                                        <td>{el.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {search.length >= elementsPerPage ? (
                    <Pagination
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        onPageChange={pageClickHandler}
                        pageCount={pageCount}
                    />
                ) : null}
            </div>
        </div>
    );
}
