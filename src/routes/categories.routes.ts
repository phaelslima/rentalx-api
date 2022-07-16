import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { PostgresCategoriesRepository } from '../repositories/PostgresCategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (resquest, response) => {
  const { name, description } = resquest.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (resquest, response) => {
  const { name, description } = resquest.body;

  const categories = categoriesRepository.list();

  return response.status(200).json(categories);
});

export { categoriesRoutes };
