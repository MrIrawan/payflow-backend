import express from 'express';

import { addNewCompanyController } from '../../../controllers/user/company/addNewCompany.controller.js';
import { getOwnCompanyController } from '../../../controllers/user/company/getOwnCompany.controller.js';
import { editOwnCompanyController } from '../../../controllers/user/company/editOwnCompany.controller.js';
import { deleteOwnCompanyController } from '../../../controllers/user/company/deleteOwnCompany.controller.js';

const router = express.Router();

router.post('/company/add', addNewCompanyController);
router.get('/company/:identifier', getOwnCompanyController);
router.put("/company/edit", editOwnCompanyController);
router.delete("/company/delete/:identifier", deleteOwnCompanyController);

export default router;