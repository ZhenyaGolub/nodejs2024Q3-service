import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    console.log(
      `Request data: url - ${req.baseUrl}, query - ${JSON.stringify(
        req.query,
      )}, body - ${JSON.stringify(req.body)}`,
    );

    res.send = function (body: any) {
      console.log(`Response body - `, body);

      return originalSend.call(this, body);
    };

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      console.log(`Response status - ${statusCode} ${statusMessage}`);
    });

    next();
  }
}
