import express from 'express';
import ExpressWs from 'express-ws';

export const app = express();
export const expressWs = ExpressWs(app);
