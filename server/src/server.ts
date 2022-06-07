import express from "express"; 
import cors from "cors";

const assetAnalyzeRouter = require('./assetAnalyze/assetAnalyzeRoute');
const app  = express();
const port = 3000;

app.use(cors());
app.use('/get-assets', assetAnalyzeRouter);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});