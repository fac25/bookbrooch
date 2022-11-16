import React, { useState, useEffect } from 'react'
import { Badge } from '@chakra-ui/react'
import { InARow } from '../../firebase/firestore'
import { onSnapshot, collection } from "firebase/firestore";
import {
    db,
} from "../../firebase/firestore";

function InARowBadge({ userId }) {
    const [badgeCount, setBadgeCount] = useState(quoteNumber)

    // USE EFFECT ====================================
    // How do I call the quoteNumber function here instead of directly querying the DB?!
    useEffect(() => {
        const colRef = collection(db, "users", userId, "quotes");
        //real time update
        onSnapshot(colRef, (snapshot) => {
            setBadgeCount(snapshot.docs.length)
        });

    }, []);

    // USE EFFECT ====================================

    const quoteNumber = () => {
        const quotecount = InARow(userId).then(amount => setBadgeCount(amount))
    }

    return (
        <Badge colorScheme='green'>
            <span>{badgeCount} </span>
            <span>quotes!</span>
        </Badge>
    )
}

export default InARowBadge