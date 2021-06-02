import React, { useState, useEffect, FormEvent } from 'react';
import { SearchCategories } from '../../common/constants';
import classes from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../store/app/slices';
import { fetchSearch } from '../../store/app/actions';

export default function Search() {
    const dispatch = useDispatch();
    const search = useSelector(getSearch);
    const [inputValue, setinputValue] = useState('');
    const [dropdownValue, setdropdownValue] = useState('');
    const [message, setMessage] = useState('');
    const [isInputOk, setIsInputOk] = useState(true);
    const [isDropdownOk, setIsDropdownOk] = useState(true);
    const INPUT_MIN_CHARS = 3;

    useEffect(() => {
        if (Object.keys(search).length === 0 && inputValue && dropdownValue) {
            setMessage('No results were found for your search.');
        } else if (Object.keys(search).length !== 0) {
            setMessage(`Found: ${search[`${dropdownValue}`].length}`);
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

        dispatch(fetchSearch(dropdownValue, inputValue));
    }

    function inputChangeHandler(event: FormEvent<HTMLInputElement>) {
        setinputValue(event.currentTarget.value);
    }

    function dropdownChangeHandler(event: FormEvent<HTMLSelectElement>) {
        setdropdownValue(event.currentTarget.value);
        setIsDropdownOk(true);
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
                <ul>
                    {search[`${dropdownValue}`] &&
                        search[`${dropdownValue}`].map((el) => {
                            return <li key={el}>{el}</li>;
                        })}
                </ul>
            </div>
        </div>
    );
}
