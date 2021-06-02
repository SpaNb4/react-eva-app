import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import classes from './Pagination.module.scss';

export default function Pagination({
    pageRangeDisplayed,
    marginPagesDisplayed,
    onPageChange,
    pageCount,
}: ReactPaginateProps) {
    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={onPageChange}
            breakClassName={classes.break}
            containerClassName={classes.pagination}
            activeClassName={classes.activePage}
            activeLinkClassName={classes.activeLink}
        />
    );
}
