import mongoose, { Document, Schema } from 'mongoose';
import shortlink from 'shortlink';
import { v4 as uuidv4 } from 'uuid';

export interface ShortLinkInterface {
  /**
   * Stringified UUIDv4.
   * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
   * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
   * @example "52907745-7672-470e-a803-a2f8feb52944"
   */
  uuid?: string;
  full: string;
  short?: string;

  clicks?: number;
  lastClickAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ShortLinkMongoose extends ShortLinkInterface, Document {}

const shortLinkSchema: Schema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      default: () => shortlink.generate(6),
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
    lastClickAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ShortLinkModel = mongoose.model<ShortLinkMongoose>('ShortLinkModel', shortLinkSchema);

export default ShortLinkModel;
