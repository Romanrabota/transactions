const {Router} = require ('express');
const router = Router();

const {getunmanegedInstance}=require('../middlewares/unmaged.mw');
const {getmanegedInstance}=require('../middlewares/managed.mw');



router.get('/unmanaged',getunmanegedInstance);
router.get('/managed',getmanegedInstance);



module.exports = router;