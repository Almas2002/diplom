import { HttpException } from '@nestjs/common';

export class TestExitsException extends HttpException{
  constructor() {
    super('такой отпрос уже существует',400);
  }
}

export class AnswerExistsException extends HttpException{
  constructor() {
    super('такой ответ в отпросе уже есть',400);
  }
}