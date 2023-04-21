const {Router} = require ('express');
const router = Router();

const {getunmanegedInstance}=require('../middlewares/unmaged.mw');
const {getmanegedInstance}=require('../middlewares/managed.mw');

//app.get('/unmanaged'


//app.get('/managed'

//app.get('/accounts'


router.get('/unmanaged',getunmanegedInstance);
router.get('/managed',getmanegedInstance);



module.exports = router;