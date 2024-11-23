import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeFile } from 'fs/promises';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('Response');
  use(req: Request, res: Response, next: NextFunction) {
    const logger = this.logger;
    const originalSend = res.send;
    const requestData = `Request data: url - ${
      req.baseUrl
    }, query - ${JSON.stringify(req.query)}, body - ${JSON.stringify(
      req.body,
    )}`;
    logger.log(requestData);

    res.send = function (body: any) {
      logger.log(`Response body - `, body);

      return originalSend.call(this, body);
    };

    res.on('finish', async () => {
      const { statusCode, statusMessage } = res;
      const responseData = `Response status - ${statusCode} ${statusMessage}`;
      logger.log(responseData);
      //writeFile('../../../logs/logs.log', requestData + '\n' + responseData);
    });

    next();
  }
}
