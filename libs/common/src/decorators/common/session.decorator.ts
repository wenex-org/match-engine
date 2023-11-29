import { sessionDeserializer } from 'mongodb-session-serializer';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { GqlContextType } from '@nestjs/graphql';
import { get, toJSON } from '@app/common/utils';
import mongoose from 'mongoose';

/**
 * Mongo session
 */
export const Session = createParamDecorator(
  async (data: 'required' | undefined, ctx: ExecutionContext) => {
    const type = ctx.getType<GqlContextType>();

    const getSession = async () => {
      const session = await mongoose.startSession();
      session.startTransaction();
      return session;
    };

    switch (type) {
      case 'http': {
        const { meta } = ctx.switchToHttp().getRequest();

        return data === 'required' || get(meta, 'x-mongo-session')
          ? await getSession()
          : undefined;
      }
      case 'rpc': {
        const context = ctx.switchToRpc().getContext();

        if (context instanceof KafkaContext) {
          const message = context.getMessage();

          const session = get(message.headers, 'x-mongo-session');

          if (session) {
            return sessionDeserializer(
              mongoose.connection.getClient() as any,
              toJSON(session),
            );
          } else {
            return data === 'required' ? await getSession() : undefined;
          }
        } else throw new Error('Unknown rpc request context');
      }
      default:
        throw new Error('Unknown request session context');
    }
  },
);
