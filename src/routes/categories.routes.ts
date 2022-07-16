import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (resquest, response) => {
  const { name, description } = resquest.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: 'Category already exists!' });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (resquest, response) => {
  const { name, description } = resquest.body;

  const categories = categoriesRepository.list();

  return response.status(200).json(categories);
});

export { categoriesRoutes };
