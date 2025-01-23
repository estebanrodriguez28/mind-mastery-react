import { Schema, model } from 'mongoose';

const thoughtSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thought_title: { type: String, required: true },
    thought_positive: { type: String, required: true },
    thought_negative: { type: String, required: true },
    created_at: { type: Date, default: Date.now },

});

const Thought = model('Thought', thoughtSchema);


export default Thought;



