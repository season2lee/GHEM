import { instance as axios } from "./instance";
import { userFollowType } from "apiTypes";

// GET

export const getUserFollowingList = async (userId: number) => {
  try {
    const { data } = await axios.get(`/follow/following/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getUserFollowerList = async (userId: number) => {
  try {
    const { data } = await axios.get(`/follow/follower/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// POST

export const postUserFollow = async (body: userFollowType) => {
  try {
    const { data } = await axios.post(`/follow`, body);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// DELETE

export const deleteUserUnfollow = async (followingId: number, followerId: number) => {
  try {
    const { data } = await axios.delete(`/follow/${followingId}/${followerId}`);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
