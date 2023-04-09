import { HttpException } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException{
  constructor() {
    super("категория не найдена",404);
  }
}

export class CategoryExitsException extends HttpException{
  constructor() {
    super("категория сущестует",400);
  }
}