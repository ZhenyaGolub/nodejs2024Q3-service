import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeLogs } from './helpers';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('Response');
  use(req: Request, res: Response, next: NextFunction) {
    let responseBody;
    const logger = this.logger;
    const originalSend = res.send;
    const requestData = `Request data: url - ${
      req.baseUrl
    }, query - ${JSON.stringify(req.query)}, body - ${JSON.stringify(
      req.body,
    )}`;
    logger.log(requestData);

    res.send = function (body: any) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    res.on('finish', async () => {
      const { statusCode, statusMessage } = res;
      const responseData = `Response data: status - ${statusCode} ${statusMessage}, body - ${responseBody}`;
      logger.log(responseData);
      const date = new Date();
      writeLogs(
        `${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n${requestData}\n${responseData}`,
      );
    });

    next();
  }
}
