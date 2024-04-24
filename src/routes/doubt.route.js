import express from 'express'
import { Router } from 'express';
import { doubtSol } from '../controllers/gemini.controller.js';

const doubtRouter = Router();

doubtRouter.post('/doubts',doubtSol)

export default doubtRouter 