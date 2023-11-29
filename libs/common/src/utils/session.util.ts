import { sessionSerializer } from 'mongodb-session-serializer';
import { ClientSession } from 'mongoose';

export const serializeSession = (session?: ClientSession) =>
  sessionSerializer(session as any);
