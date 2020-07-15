import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';
import PageLoadingIndicator from '../PageLoadingIndicator';

const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen,
        isPageLoading
    } = useHeader();

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = searchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={searchOpen} />
            </Route>
        </Suspense>
    ) : null;
    const pageLoadingIndicator = isPageLoading ? (
        <PageLoadingIndicator />
    ) : null;

    return (
        <header className={rootClass}>
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    <NavTrigger />
                </div>
                {pageLoadingIndicator}
                <OnlineIndicator
                    hasBeenOffline={hasBeenOffline}
                    isOnline={isOnline}
                />
                <Link to={resourceUrl('/')}>
                    <Logo classes={{ logo: classes.logo }} />
                </Link>
                Testing
                <div className={classes.secondaryActions}>
                    <SearchTrigger
                        active={searchOpen}
                        onClick={handleSearchTriggerClick}
                    />
                    <CartTrigger />
                </div>
            </div>
            {searchBar}
        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
