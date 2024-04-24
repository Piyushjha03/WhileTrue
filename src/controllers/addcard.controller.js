import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);