const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      trim: true,
      required: true,  // You may want to ensure taskName is always present
    },
    createDate: {
      type: Date,
      default: Date.now, // Automatically set the creation date if not provided
    },
    completedDate: {
      type: Date,
      default: null, // Set default value for completedDate if not completed
    },
    completed: {
      type: Boolean,
      default: false, // Default to false if no status is provided
    }
  },
  {
    // Set the collection name explicitly (optional)
    collection: 'tasks',
  }
);

// Indexes for better performance on frequent queries
taskSchema.index({ completed: 1 });
taskSchema.index({ createDate: 1 });
taskSchema.index({ taskName: 1 });

module.exports = mongoose.model('Task', taskSchema);
