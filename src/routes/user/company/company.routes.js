import express from 'express';

import { addNewCompanyController } from '../../../controllers/user/company/addNewCompany.controller.js';
import { getOwnCompanyController } from '../../../controllers/user/company/getOwnCompany.controller.js';
import { editOwnCompanyController } from '../../../controllers/user/company/editOwnCompany.controller.js';
import { deleteOwnCompanyController } from '../../../controllers/user/company/deleteOwnCompany.controller.js';

import { isUserAuthenticated } from '../../../middleware/isAuthenticated.js';
import { joinCompanyController } from '../../../controllers/user/company/joinCompany.controller.js';

const router = express.Router();

router.post('/company/add', isUserAuthenticated, addNewCompanyController);
router.post('/company/join', isUserAuthenticated, joinCompanyController);
router.get('/company', isUserAuthenticated, getOwnCompanyController);
router.put("/company/edit/:companyId", isUserAuthenticated, editOwnCompanyController);
router.delete("/company/delete/:companyId", isUserAuthenticated, deleteOwnCompanyController);

export default router;