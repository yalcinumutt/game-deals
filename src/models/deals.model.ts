import {Entity, model, property} from '@loopback/repository';

@model()
export class Deals extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  metaCriticLink: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isOnSale: boolean;

  @property({
    type: 'string',
    required: true,
  })
  thumbnail: string;

  @property({
    type: 'number',
    required: true,
  })
  dealRating: number;


  constructor(data?: Partial<Deals>) {
    super(data);
  }
}

export interface DealsRelations {
  // describe navigational properties here
}

export type DealsWithRelations = Deals & DealsRelations;
