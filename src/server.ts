import path from 'path';
import express from 'express';
import { app, expressWs } from './express';

const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// this prevents listening to the port when running tests
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server successfully started at http://localhost:${PORT}`));
}

export { app };
