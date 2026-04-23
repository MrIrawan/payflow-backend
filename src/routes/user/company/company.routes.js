import express from 'express';

import { addNewCompanyController } from '../../../controllers/user/company/addNewCompany.controller.js';

const router = express.Router();

router.post('/company/add', addNewCompanyController);

export default router;