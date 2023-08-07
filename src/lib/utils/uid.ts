import { customAlphabet } from 'nanoid/async';

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const alphanumeric = numbers + lowercase + uppercase;

const nanoid = customAlphabet(alphanumeric, 24);

export async function getUid() {
  return nanoid();
}
