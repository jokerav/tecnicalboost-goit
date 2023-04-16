import './user.scss'
import {ReactComponent as Logo} from "../../img/logo.svg";
import boy from '../../img/Boy.png'
import boy2x from '../../img/Boy@2x.png'
import {useDispatch, useSelector} from "react-redux";
import {getFollowList} from "../../store/selectors";
import {addFollow, removeFollow} from "../../store/dataSlice";
import {useSetFollowersMutation} from "../../store/usersAPI";
import {useEffect, useState} from "react";

const User = ({user}) => {
    const dispatch = useDispatch();
    const {id, tweets} = user;
    let [followers, setFollowers] = useState(user.followers)
    const followList = useSelector(getFollowList);
    const [setFollowersOnServer] = useSetFollowersMutation();
    useEffect(()=> {
        if (!isFollowing){setFollowersOnServer({id, followers: followers + 1})}
        if (isFollowing){setFollowersOnServer({id, followers: followers - 1})}
    }, [followers]);


    let isFollowing = followList.includes(id);

    const handleClick = () => {
        if (!isFollowing) {
            dispatch(addFollow({id}));
            setFollowers(followers+1)
        }
        if (isFollowing){
            dispatch(removeFollow({id}));
            setFollowers(followers-1)
        }
    }
    return (
        <div className='card'>
            <Logo className='logo'/>
            <div className='picture'></div>
            <div className='line'></div>
            <picture className='photo'>
                <source srcSet={`${boy2x} 2x, ${boy} 1x`}/>
                <img src='#' alt='Фото'/>
            </picture>
            <div className='tweets'>{`${tweets} tweets`}</div>
            <div className='followers'>{`${followers} followers`}</div>

            <button className={isFollowing? 'btnFollow isFollow' :"btnFollow"} onClick={() => handleClick()}>{isFollowing ? 'following' : "follow"}</button>
        </div>
    )
}
export default User