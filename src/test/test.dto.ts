export class CreateTestDto {
  title: string;
  answers: AnswerDto[];
}

export class AnswerDto {
  score: number;
  title: string;
}