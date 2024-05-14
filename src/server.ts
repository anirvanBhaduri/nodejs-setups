import express from 'express';
import ExpressWs from 'express-ws';
import path from 'path';

const PORT = process.env.PORT || 10000;
const app = express();
const expressWs = ExpressWs(app);

app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(PORT, () => console.log(`Server successfully started at http://localhost:${PORT}`));
