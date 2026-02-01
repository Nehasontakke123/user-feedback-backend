import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    formId: { type: Number, required: true },
    answers: { type: Object, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
