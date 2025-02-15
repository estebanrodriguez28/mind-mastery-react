import { Schema, model } from 'mongoose';

const thoughtSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    p_thought: { type: String, required: true },
    n_thought: { type: String, required: true },
    n_opacity: { type: Number, required: true, default: 0.5 },
    p_opacity: { type: Number, required: true, default: 0.5 },
    isPositive: { type: Boolean, default: false }

});

const Thought = model('Thought', thoughtSchema);


export default Thought;



