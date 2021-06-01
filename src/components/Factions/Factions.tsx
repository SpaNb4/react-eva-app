import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFactions } from './../../store/app/slices';
import { fetchFactions } from './../../store/app/actions';
import classes from './Factions.module.scss';

export default function Factions() {
    const dispatch = useDispatch();
    const factions = useSelector(getFactions);

    useEffect(() => {
        dispatch(fetchFactions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.Factions}>
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
