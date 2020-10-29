import diaries from '../../data/diaries';

import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Date.now(),
    ...entry,
  };
  console.log('newDiaryEntry', newDiaryEntry);
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveDiaryEntries,
  findById,
};
