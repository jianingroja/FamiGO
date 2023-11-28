import mongoose from 'mongoose';
import { UserModel } from './users';

import { ActivityWithUser } from '../types/activity';

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  userInfo: {
    username: {
      type: String,
      required: true,
    },
  },

  title: {
    type: String,
    required: true,
  },

  materials: {
    type: [String],
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: true,
  },
  filters: {
    topic: {
      type: String,
      required: true,
    },
    numOfKids: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  likes: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comments: {
    username: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  type: {
    type: String,
    default: 'published',
    required: true,
  },
});

//Model
export const ActivityModel = mongoose.model('Activity', activitySchema);

export const getActivities = () => ActivityModel.find();
export const getActivitiesByID = (id: string) => ActivityModel.findById(id);
export const getActivitiesFromUser = (username: string) =>
  UserModel.findOne({ username: username });

export const createActivity = async (activity: ActivityWithUser) => {
  const res = await ActivityModel.create(activity);

  return res;
};
