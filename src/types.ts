export enum Sharing {
  Private = 'private',
  Public = 'public'
}

export enum Skills {
  Dialogue = 'dialogue',
  Action = 'action',
  Character = 'character',
  Tone = 'tone',
  Setting = 'setting',
  Conflict = 'conflict',
  Fighting = 'fighting',
  Suspense = 'suspense',
  SciFi = 'sci-fi',
  Fantasy = 'fantasy',
  Romance = 'romance',
  Horror = 'horror',
  Mystery = 'mystery',
  Thriller = 'thriller',
  Comedy = 'comedy',
  Drama = 'drama',
  Poetry = 'poetry',
  FreeWrite = 'free-write'
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  userId: string;
  sharing: Sharing;
  skills: (Skills | string)[];
}