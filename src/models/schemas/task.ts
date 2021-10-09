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
    enum: ['in-progress', 'completed'],
    default: 'in-progress',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default taskSchema;
