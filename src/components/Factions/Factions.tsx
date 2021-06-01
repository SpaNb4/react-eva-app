import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFactions, getFactionsLoading } from './../../store/app/slices';
import { fetchFactions } from './../../store/app/actions';
import classes from './Factions.module.scss';
import Loader from '../Loader/Loader';

export default function Factions() {
    const dispatch = useDispatch();
    const factions = useSelector(getFactions);
    const loading = useSelector(getFactionsLoading);

    useEffect(() => {
        dispatch(fetchFactions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.Factions}>
            {loading && <Loader />}
            {factions &&
                factions.map((faction) => {
                    return (
                        <div key={faction.faction_id} className={classes.FactionItem}>
                            {faction.name}
                        </div>
                    );
                })}
        </div>
    );
}
