import { Metadata } from './generic.interface';
import { ClientSession } from 'mongoose';

export type ServiceOptions = {
  meta?: Metadata;
  session?: ClientSession;
};

export type RepositoryOptions = {
  new?: boolean;
  session?: ClientSession;
};
