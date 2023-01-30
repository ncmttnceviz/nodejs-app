import 'module-alias/register';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {App} from "./app";

const bootstrap = async () => {
    process.env.TZ = 'Europe/Istanbul'
    const app = new App(express());
    await app.start().then();
}

bootstrap().then();
