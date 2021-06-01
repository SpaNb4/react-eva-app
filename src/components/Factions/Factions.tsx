import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFactions, getSolarSystems, getLoading, getCorporations, getCeo, getRaces } from './../../store/app/slices';
import { fetchFactions, fetchSolarSystem, fetchCorporation, fetchCeo, fetchRaces } from './../../store/app/actions';
import classes from './Factions.module.scss';
import Loader from '../Loader/Loader';
import Corporation from './Corporation/Corporation';
import Modal from './../Modal/Modal';
import Ceo from './Ceo/Ceo';

interface IFactionProps {
    name: string;
    description: string;
    solarSystemId: number;
    corporationId: number;
}

function Faction({ name, description, solarSystemId, corporationId }: IFactionProps) {
    const dispatch = useDispatch();
    const solarSystems = useSelector(getSolarSystems);
    const corporations = useSelector(getCorporations);
    const ceoArr = useSelector(getCeo);
    const races = useSelector(getRaces);
    const [isExtend, setIsExtend] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isCeoNameClicked, setIsCeoNameClicked] = useState(false);
    const clsFaction = [classes.FactionItem];

    const solarSystem = solarSystems?.find((system) => system.system_id === solarSystemId);
    const corporation = corporations?.find((corporation) => corporation.corporationId === corporationId);
    const ceo = ceoArr?.find((ceoEl) => ceoEl.ceoId === corporation?.ceo_id);
    const race = races?.find((race) => race.race_id === ceo?.race_id);

    if (isExtend) {
        clsFaction.push(classes.FactionActive);
    }

    useEffect(() => {
        if (isExtend) {
            dispatch(fetchSolarSystem(solarSystemId));
            dispatch(fetchCorporation(corporationId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExtend]);

    useEffect(() => {
        if (ceoArr.length) {
            setIsModalActive(true);
        }
    }, [ceoArr]);

    function corporationClickHandler(event: MouseEvent<HTMLSpanElement>) {
        event.stopPropagation();
        dispatch(fetchCeo(corporation?.ceo_id!));
    }

    function factionClickHandler() {
        setIsExtend(!isExtend);
    }

    function ceoNameClickHandler() {
        dispatch(fetchRaces());
        setIsCeoNameClicked(true);
    }

    function leftArrowClickHandler() {
        setIsCeoNameClicked(false);
    }

    return isExtend ? (
        <>
            <div onClick={factionClickHandler} className={clsFaction.join(' ')}>
                <h3>{name}</h3>
                <p>{description}</p>
                <h3>{solarSystem && solarSystem.name}</h3>
                <span className={classes.Link} onClick={corporationClickHandler}>
                    {corporation && corporation.name}
                </span>
            </div>

            {isCeoNameClicked ? (
                <Modal isActive={isModalActive} setIsModalActive={setIsModalActive}>
                    <Ceo
                        name={ceo?.name}
                        birthday={ceo?.birthday}
                        race={race?.name}
                        leftArrowClickHandler={leftArrowClickHandler}
                    />
                </Modal>
            ) : (
                <Modal isActive={isModalActive} setIsModalActive={setIsModalActive}>
                    <Corporation
                        name={corporation?.name}
                        member_count={corporation?.member_count}
                        description={corporation?.description}
                        ceoName={ceo && ceo?.name}
                        ceoNameClickHandler={ceoNameClickHandler}
                    />
                </Modal>
            )}
        </>
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
                            corporationId={faction.corporation_id}
                        />
                    );
                })}
        </div>
    );
}
