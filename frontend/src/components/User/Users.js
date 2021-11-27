import { User } from './User';

export const Users = (props) => {
    return (
        <div>
            {props.users.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
};
