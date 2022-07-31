import React, { FC } from "react";

import Avatar from "../Avatar";
import { IUserCard } from "./types";

const UserCard: FC<IUserCard> = ({ userAvatar }) => {
    return (
        <div>
            <Avatar mode={"rectangle"} picture={userAvatar}></Avatar>
        </div>
    );
};

export default UserCard;
