import express from "express";
import userRoutes from "./routes/user.routes";
import formRoutes from "./routes/form.routes";
import submissionRoutes from "./routes/submission.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/forms", formRoutes);
app.use("/submissions", submissionRoutes);

export default app;
