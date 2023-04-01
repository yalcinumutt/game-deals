import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Deals} from '../models';
import {DealsRepository} from '../repositories';
import {inject} from '@loopback/core';
import {CheapShark} from '../services';

export class DealsControllerController {
  constructor(
    @repository(DealsRepository)
    public dealsRepository : DealsRepository,
    @inject('services.CheapShark') protected cheapSharkService: CheapShark
  ) {}

  @post('/deals')
  @response(200, {
    description: 'Deals model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deals)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deals, {
            title: 'NewDeals',
            exclude: ['id'],
          }),
        },
      },
    })
    deals: Omit<Deals, 'id'>,
  ): Promise<Deals> {
    return this.dealsRepository.create(deals);
  }

  @get('/deals')
  @response(200, {
    description: 'Array of Deals model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deals, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Deals) filter?: Filter<Deals>,
  ): Promise<Deals[]> {
    const deals = await this.cheapSharkService.deals(1, 15);
    return deals;
  }

  @patch('/deals')
  @response(200, {
    description: 'Deals PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deals, {partial: true}),
        },
      },
    })
    deals: Deals,
    @param.where(Deals) where?: Where<Deals>,
  ): Promise<Count> {
    return this.dealsRepository.updateAll(deals, where);
  }

  @get('/deals/{id}')
  @response(200, {
    description: 'Deals model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deals, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Deals, {exclude: 'where'}) filter?: FilterExcludingWhere<Deals>
  ): Promise<Deals> {
    return this.dealsRepository.findById(id, filter);
  }

  @patch('/deals/{id}')
  @response(204, {
    description: 'Deals PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deals, {partial: true}),
        },
      },
    })
    deals: Deals,
  ): Promise<void> {
    await this.dealsRepository.updateById(id, deals);
  }

  @put('/deals/{id}')
  @response(204, {
    description: 'Deals PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deals: Deals,
  ): Promise<void> {
    await this.dealsRepository.replaceById(id, deals);
  }

  @del('/deals/{id}')
  @response(204, {
    description: 'Deals DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dealsRepository.deleteById(id);
  }
}
