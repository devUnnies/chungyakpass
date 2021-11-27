export const User = (props) => {
    return (
        <div>
            <h2>{props.user.name}</h2>
            <h4>{props.user.email}</h4>
        </div>
    );
};
