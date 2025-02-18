import '../styles/userPill.css'
import { User } from 'common-types';

interface UserPillProps {
    user: User; 
}

const UserPill : React.FC<UserPillProps> = ({user}) => {
    return <div className={'userPill'} id={user._id}>{user.name + " " + user.surname}</div>
}

export default UserPill;