import HTTP_STATUS from 'http-status-codes';
import JWT from 'jsonwebtoken';
import { Context } from 'koa';

export async function verifyToken(ctx: Context, next: () => void) {
  if (!ctx.request.headers.authorization) {
    ctx.response.status = HTTP_STATUS.UNAUTHORIZED;
    ctx.body = { message: 'Not authorization headers' };
    return;
  }
  const token = ctx.response.headers.authorization;
  if (!token) {
    ctx.response.status = HTTP_STATUS.FORBIDDEN;
    ctx.body = { message: 'Not token provided' };
    return;
  }

  try {
    const decode: any = JWT.verify(token, 'testsecret');
    ctx.state.user = decode.data;
  } catch (error) {
    ctx.response.status = HTTP_STATUS.UNAUTHORIZED;
    ctx.body = { message: 'Token is not valid' };
  }

  await next();
}