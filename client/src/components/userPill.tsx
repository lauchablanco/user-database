import '../styles/userPill.css'
import { User } from 'common-types';

interface UserPillProps {
    user: User; 
}

const UserPill : React.FC<UserPillProps> = ({user}) => {
    return <div className={'userPill'}>This is a user Pill {user.name}</div>
}

export default UserPill;