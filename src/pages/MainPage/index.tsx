import React from "react";
import UserCard from "../../components/UI/UserCard";
import { userAPI } from "../../services/UserService";

const MainPage = () => {
    const {
        data: users,
        isLoading,
        isError,
        isSuccess,
    } = userAPI.useFetchAllUsersQuery(0);

    return (
        <div>
            {isSuccess ? (
                users.map((user) => (
                    <UserCard key={user.id} userAvatar={user.color}></UserCard>
                ))
            ) : isLoading ? (
                <h2>...loading</h2>
            ) : (
                <h2>error on download users</h2>
            )}
        </div>
    );
};

export default MainPage;
