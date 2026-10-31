import { Request, Response } from 'express';
import fs from 'fs';
import { resolveDataPath } from '../utils/pathResolver';

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  title: string;
  breed: string;
  gender: string;
  age: string;
  origin: string;
  status: 'Available' | 'Reserved' | 'Gone Home';
  images: string[];
  inclusions: string[];
}

const getPuppiesData = (): Puppy[] => {
  try {
    const dataPath = resolveDataPath('puppies.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading puppies.json:', error);
    return [];
  }
};

export const getPuppies = (req: Request, res: Response) => {
  let puppies = getPuppiesData();
  const { breed, origin, gender, status } = req.query;

  if (breed && typeof breed === 'string' && breed.toLowerCase() !== 'all') {
    const breedQuery = breed.toLowerCase();
    puppies = puppies.filter(p => p.breed.toLowerCase().includes(breedQuery));
  }

  if (origin && typeof origin === 'string' && origin.toLowerCase() !== 'all') {
    const originQuery = origin.toLowerCase();
    puppies = puppies.filter(p => {
      if (originQuery === 'local') return p.origin.toLowerCase().includes('dubai') || p.origin.toLowerCase().includes('local');
      if (originQuery === 'imported') return p.origin.toLowerCase().includes('import');
      return p.origin.toLowerCase().includes(originQuery);
    });
  }

  if (gender && typeof gender === 'string' && gender.toLowerCase() !== 'all') {
    const genderQuery = gender.toLowerCase();
    puppies = puppies.filter(p => p.gender.toLowerCase().includes(genderQuery));
  }

  if (status && typeof status === 'string') {
    puppies = puppies.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }

  res.json({
    success: true,
    count: puppies.length,
    data: puppies
  });
};

export const getPuppyBySlug = (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const puppies = getPuppiesData();
  const puppy = puppies.find(p => p.slug.toLowerCase() === slug.toLowerCase());

  if (!puppy) {
    return res.status(404).json({
      success: false,
      message: `Puppy with slug '${slug}' not found`
    });
  }

  // Find next and previous puppies
  const currentIndex = puppies.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase());
  const prevPuppy = currentIndex > 0 ? puppies[currentIndex - 1] : puppies[puppies.length - 1];
  const nextPuppy = currentIndex < puppies.length - 1 ? puppies[currentIndex + 1] : puppies[0];

  res.json({
    success: true,
    data: puppy,
    navigation: {
      prev: { name: prevPuppy.name, slug: prevPuppy.slug },
      next: { name: nextPuppy.name, slug: nextPuppy.slug }
    }
  });
};

export const getFeaturedPuppies = (_req: Request, res: Response) => {
  const puppies = getPuppiesData();
  const featured = puppies.slice(0, 8);
  res.json({
    success: true,
    count: featured.length,
    data: featured
  });
};

export const getGoneHomePuppies = (_req: Request, res: Response) => {
  const puppies = getPuppiesData();
  // Mark half of the list as happy alumni that went home
  const goneHome = puppies.slice(15, 35).map(p => ({
    ...p,
    status: 'Gone Home'
  }));

  res.json({
    success: true,
    count: goneHome.length,
    data: goneHome
  });
};
