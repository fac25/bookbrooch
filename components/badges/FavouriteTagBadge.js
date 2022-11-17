import React, { useState, useEffect } from 'react'
import { favTag } from '../../firebase/firestore'
import { Badge } from '@chakra-ui/react'
import { onSnapshot, collection } from "firebase/firestore";
import {
    db,
} from "../../firebase/firestore";

function FavouriteTagBadge({ userId }) {
    const [fav, setFav] = useState(getFavTags)

    // USE EFFECT
    useEffect(() => {
        const colRef = collection(db, "users", userId, "quotes");
        onSnapshot(colRef, () => {
            favTag(userId).then(favTags => {
                setFav(favTags)
                // console.log(favTags)
            });

        })
        // const colRef = collection(db, "users", userId, "quotes");
        // //real time update
        // onSnapshot(colRef, (snapshot) => {
        //     setFav([snapshot])
        // });

    }, []);
    // ========================================


    const getFavTags = () => {
        favTag(userId).then(favTags => {
            setFav(favTags)
            // console.log(amount)
        })
    }
    // const quoteNumber = () => {
    //     const quotecount = InARow(userId).then(amount => setBadgeCount(amount))
    // }

    return (
        <Badge colorScheme='blue'>
            <span>My favourite Tag{fav?.length > 1 ? "s" : ""}: </span>
            <span>{`${fav}`} </span>
        </Badge>
    )
}

export default FavouriteTagBadge