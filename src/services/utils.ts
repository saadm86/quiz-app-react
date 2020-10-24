export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);


  export const ArrayMaker = (min: number, max: number) => {
    let numQuestion: number[] = [];
    for (var i = min; i <= max; i++) {
      numQuestion.push(i);
    }
    return numQuestion;
  };
  
  export const QuizDifficulty = () => {
    let diffculty: string[] = ["easy", "medium", "hard"];
    return diffculty;
  };