import {Schema} from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['done', 'not-done'],
  },
  dueDate: {
    type: Date,
  },
});

export default taskSchema;
