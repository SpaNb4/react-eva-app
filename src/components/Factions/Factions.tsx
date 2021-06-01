import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFactions, getSolarSystems, getLoading } from './../../store/app/slices';
import { fetchFactions, fetchSolarSystem } from './../../store/app/actions';
import classes from './Factions.module.scss';
import Loader from '../Loader/Loader';

interface IFactionProps {
    name: string;
    description: string;
    solarSystemId: number;
}

function Faction({ name, description, solarSystemId }: IFactionProps) {
    const dispatch = useDispatch();
    const solarSystems = useSelector(getSolarSystems);
    const [isExtend, setIsExtend] = useState(false);
    const clsFaction = [classes.FactionItem];

    const solarSystem = solarSystems?.find((system) => system.system_id === solarSystemId);

    if (isExtend) {
        clsFaction.push(classes.FactionActive);
    }

    function factionClickHandler() {
        setIsExtend(!isExtend);
    }

    useEffect(() => {
        if (isExtend) {
            dispatch(fetchSolarSystem(solarSystemId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExtend]);

    return isExtend ? (
        <div onClick={factionClickHandler} className={clsFaction.join(' ')}>
            <h3>{name}</h3>
            <p>{description}</p>
            <h3>{solarSystem && solarSystem.name}</h3>
        </div>
    ) : (
        <div onClick={factionClickHandler} className={clsFaction.join(' ')}>
            {name}
        </div>
    );
}

export default function Factions() {
    const dispatch = useDispatch();
    const factions = useSelector(getFactions);
    const loading = useSelector(getLoading);

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
                        <Faction
                            key={faction.faction_id}
                            name={faction.name}
                            description={faction.description}
                            solarSystemId={faction.solar_system_id}
                        />
                    );
                })}
        </div>
    );
}
