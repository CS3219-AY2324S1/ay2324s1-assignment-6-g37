export type LeetcodeQuestion = {
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  content: string
  topicTags: { name: string }[]
};

export type Question = {
  title: string
  categories: string[]
  complexity: 'Easy' | 'Medium' | 'Hard'
  description: string
};
