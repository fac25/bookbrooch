import React, { useState } from 'react'
import { favTag } from '../../firebase/firestore'
import { Badge } from '@chakra-ui/react'

function FavouriteTagBadge({ userId }) {
    const [fav, setFav] = useState(setFavTag)

    const setFavTag = () => {
        const favouriteTag = favTag(userId).then(amount => {
            setFav(amount)
            console.log(amount)
        })

    }

    return (
        <Badge colorScheme='blue'>
            <span>{fav} </span>
            <span>are your favourite tags</span>
        </Badge>
    )
}

export default FavouriteTagBadge