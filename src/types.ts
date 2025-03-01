export interface Novel {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  filePath: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  filePath: string;
}