import express from 'express';

import { addNewCompanyController } from '../../../controllers/user/company/addNewCompany.controller.js';
import { getOwnCompanyController } from '../../../controllers/user/company/getOwnCompany.controller.js';

const router = express.Router();

router.post('/company/add', addNewCompanyController);
router.get('/company/:identifier', getOwnCompanyController);

export default router;