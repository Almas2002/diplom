import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateTestDto } from './test.dto';
import { AnswerExistsException, TestExitsException } from './test.exception';

@Injectable()
export class TestService{
  constructor(@InjectRepository(Test) private testRepository:Repository<Test>,@InjectRepository(Answer) private answerRepository:Repository<Answer>) {}


  async create(dto:CreateTestDto): Promise<{ id: number }>{
    const candidate = await this.testRepository.findOne({where:{title:dto.title}})
    if(candidate){
      throw new TestExitsException()
    }
    const test = await this.testRepository.save({title:dto.title})
    let ansCandidate
    for (const answer of dto.answers){
      ansCandidate = await this.answerRepository.findOne({where:{test,title:dto.title}})
      if(ansCandidate){
        await this.testRepository.delete({id:test.id})
        throw new AnswerExistsException()
      }
      await this.answerRepository.save({title:answer.title,score:answer.score})
    }

    return {id:test.id}
  }

  async getTests(){
    return this.testRepository.find({relations:["answers"]})
  }
}