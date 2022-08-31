import React from "react";

import Avatar from "../../components/UI/Avatar";
import { useTypedSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import styles from "./styles.module.css";

const Profile = () => {
    const { currentUserId } = useTypedSelector((state) => state.user);
    const {
        data: users,
        isLoading,
        isError,
        isSuccess,
    } = userAPI.useFetchLoginUserQuery(currentUserId);

    if (isLoading) {
        return <h1>loading</h1>;
    }

    if (isError) {
        return <h1>error</h1>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.profile}>
                <Avatar
                    picture={isSuccess ? users[0].color : "white"}
                    mode={"circle"}
                ></Avatar>
            </div>
            <p>Welcome</p>
        </div>
    );
};

export default Profile;
