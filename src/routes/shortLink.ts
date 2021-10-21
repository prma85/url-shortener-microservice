import { Router } from 'express';
import StatusCodes from 'http-status-codes';

import { cors } from '../config';
import ShortLinkController from '../controllers/shortLink';
import { SuccessResponse, ErrorResponse } from '../middleware';

const router = Router();

const { ACCEPTED, NOT_FOUND, NOT_IMPLEMENTED, CREATED, OK, BAD_REQUEST } = StatusCodes;

router.get('/list', async (_req, res) => {
  try {
    const controller = new ShortLinkController();

    const shortLinkList = await controller.findAll();
    const response = new SuccessResponse(shortLinkList);

    return res.status(OK).json(response);
  } catch (err) {
    const response = new ErrorResponse('ERROR_SHORT_LINK_LIST', err.message);
    return res.status(BAD_REQUEST).json(response);
  }
});

router.get('/:short', async (req, res) => {
  const { short } = req.params;
  const controller = new ShortLinkController();

  const shortLink = await controller.findByShort(short);

  if (!shortLink) {
    // respond with html page
    if (req.accepts('html')) {
      return res.redirect('/404');
    }

    const response = new ErrorResponse('ERROR_RESOURCE_NOT_FOUND', 'Not Found');
    return res.status(NOT_FOUND).json(response);
  }

  await controller.addClick(shortLink);

  return res.status(302).redirect(shortLink.full);
});

router.delete('/:short', async (req, res) => {
  const { short } = req.params;
  const controller = new ShortLinkController();

  const shortLink = await controller.delete(short);

  if (!shortLink) {
    // respond with html page
    if (req.accepts('html')) {
      return res.redirect('/404');
    }

    const response = new ErrorResponse('ERROR_RESOURCE_NOT_FOUND', 'Not Found');

    return res.status(404).json(response);
  }

  return res.status(ACCEPTED).json(shortLink);
});

// router.post('/', cors, async (req, res) => { // block access by cors
router.post('/', async (req, res) => {
  try {
    const { body } = req;

    console.log(body);
    console.log(typeof body);

    const controller = new ShortLinkController();

    const shortLink = await controller.create(body);
    const response = new SuccessResponse(shortLink);

    return res.status(CREATED).json(response);
  } catch (err) {
    const response = new ErrorResponse('ERROR_SHORT_LINK_CREATE', err.message);
    return res.status(BAD_REQUEST).json(response);
  }
});

router.put('/', cors, async (req, res) => {
  try {
    const { body } = req;
    const controller = new ShortLinkController();

    const shortLink = await controller.update(body);
    const response = new SuccessResponse(shortLink);

    return res.status(OK).json(response);
  } catch (err) {
    const response = new ErrorResponse('ERROR_SHORT_LINK_UPDATE', err.message);
    return res.status(BAD_REQUEST).json(response);
  }
});

router.patch('*', async (_req, res) => {
  return res.status(NOT_IMPLEMENTED).json(new Error('ERROR_NOT_IMPLEMENTED'));
});

export default router;
