import { Body, Delete, Get, Path, Post, Put, Route, Request } from 'tsoa';
import { v4 as uuidv4 } from 'uuid';
import shortlink from 'shortlink';

import ShortLinkModel, { ShortLinkInterface } from '../models/shortLink';
import util from '../utils';

@Route('/api')
export default class ShortLinkController {
  public async findById(uuid: string): Promise<ShortLinkInterface | null> {
    const document = await ShortLinkModel.findOne({ uuid });
    if (document) {
      return document;
    }
    return null;
  }

  @Get('/list')
  public async findAll(): Promise<Array<ShortLinkInterface>> {
    const documents = await ShortLinkModel.find();

    return documents || ([] as Array<ShortLinkInterface>);
  }

  @Get('{shortUrl}')
  public async findByShort(@Path() shortUrl: string): Promise<ShortLinkInterface | null> {
    const document = await ShortLinkModel.findOne({
      short: shortUrl,
      deletedAt: {
        $exists: false,
      },
    });

    if (document) {
      return document;
    }

    return null;
  }

  @Post('/')
  public async create(@Body() requestBody: ShortLinkInterface): Promise<ShortLinkInterface> {
    let document = await ShortLinkModel.findOne({
      short: requestBody.short,
      deletedAt: {
        $exists: false,
      },
    });

    if (!document) {
      try {
        const newBody = { ...requestBody };

        if (!newBody.uuid) {
          newBody.uuid = uuidv4();
        }

        if (!newBody.short) {
          newBody.short = shortlink.generate(6);
        }

        if (!newBody.createdAt) {
          newBody.createdAt = new Date();
        }

        const shortLinkCreated = await ShortLinkModel.create(requestBody);
        return shortLinkCreated;
      } catch (e) {
        throw e;
      }
    }

    throw { message: 'code already in use' };
  }

  @Put('/')
  public async update(@Body() requestBody: ShortLinkInterface): Promise<ShortLinkInterface | null> {
    const document = await ShortLinkModel.findOne({
      uuid: requestBody.uuid,
    });

    if (document) {
      try {
        await ShortLinkModel.updateOne(
          {
            uuid: requestBody.uuid,
          },
          util.removeUndefinedProps(requestBody)
        );

        return requestBody;
      } catch (e) {
        throw e;
      }
    }

    return this.create(requestBody);
  }

  @Delete('{shortUrl}')
  public async delete(@Path() shortUrl: string): Promise<ShortLinkInterface | null> {
    const document = await ShortLinkModel.findOne({
      short: shortUrl,
      deletedAt: {
        $exists: false,
      },
    });

    if (document) {
      document.deletedAt = new Date();

      await ShortLinkModel.updateOne(
        {
          short: shortUrl,
          deletedAt: {
            $exists: false,
          },
        },
        document
      );

      return document;
    }

    return null;
  }

  public async addClick(shortLink: ShortLinkInterface) {
    shortLink.clicks = !shortLink.clicks ? 1 : shortLink.clicks + 1;
    shortLink.lastClickAt = new Date();

    const shortLinkUpdated = await this.update(shortLink);

    return shortLinkUpdated;
  }
}
